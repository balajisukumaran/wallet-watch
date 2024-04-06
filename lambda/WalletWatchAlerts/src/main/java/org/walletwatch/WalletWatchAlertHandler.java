package org.walletwatch;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.secretsmanager.AWSSecretsManager;
import com.amazonaws.services.secretsmanager.AWSSecretsManagerClientBuilder;
import com.amazonaws.services.secretsmanager.model.GetSecretValueRequest;
import com.amazonaws.services.secretsmanager.model.GetSecretValueResult;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.walletwatch.object.Alert;
import org.walletwatch.object.MessageBody;
import org.walletwatch.object.Secrets;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class WalletWatchAlertHandler implements RequestHandler<Map<String, String>, Map<String, Object>> {

    @Override
    public Map<String, Object> handleRequest(Map<String, String> event, Context context) {
        try {

            String secretName = "WalletWatchSecret";
            String region = "us-east-1";

            ObjectMapper objectMapper = new ObjectMapper();

            // Retrieve the secret from AWS Secrets Manager
            AWSSecretsManager client  = AWSSecretsManagerClientBuilder.standard()
                    .withRegion(region)
                    .build();
            GetSecretValueRequest getSecretValueRequest = new GetSecretValueRequest()
                    .withSecretId(secretName);
            GetSecretValueResult getSecretValueResult = client.getSecretValue(getSecretValueRequest);

            // Assuming the secret is in plain text and not binary
            String secretString = getSecretValueResult.getSecretString();

            // Parse the JSON secret string and set it to a POJO
            Secrets secrets = objectMapper.readValue(secretString, Secrets.class);


            // JDBC URL, username and password of MySQL server
            final String url = secrets.getRdsUrl();
            final String user = secrets.getRdsUserName();
            final String password = secrets.getRdsPassword();
            List<Alert> alerts = new ArrayList<>();

            // Load MySQL JDBC driver
            try {
                Class.forName("com.mysql.cj.jdbc.Driver");
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
                return null;
            }

            try (Connection connection = DriverManager.getConnection(url, user, password)) {
                // Prepare the stored procedure call without input parameters
                String storedProc = "{call sp_alert()}";
                try (CallableStatement callableStatement = connection.prepareCall(storedProc)) {

                    // Execute the stored procedure
                    boolean hasResults = callableStatement.execute();

                    // Process all result sets (tables)
                    while (hasResults) {
                        try (ResultSet rs = callableStatement.getResultSet()) {
                            // Process the current result set
                            while (rs.next()) {
                                // Retrieve data from the current result set
                                Alert alert = new Alert(rs.getString("userid"), rs.getString("email"), rs.getString("c_name"), rs.getString("overspend"));
                                alerts.add(alert);
                            }
                        }
                        // Check if there are more result sets
                        hasResults = callableStatement.getMoreResults();
                    }
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
            HashMap<String, List<MessageBody>> messageBodies = AlertService.parseBody(alerts);
            EmailService.sendEmail(messageBodies);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
}