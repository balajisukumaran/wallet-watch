package com.walletwatch.config;

import com.amazonaws.services.secretsmanager.AWSSecretsManager;
import com.amazonaws.services.secretsmanager.AWSSecretsManagerClientBuilder;
import com.amazonaws.services.secretsmanager.model.GetSecretValueRequest;
import com.amazonaws.services.secretsmanager.model.GetSecretValueResult;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.walletwatch.config.object.Secrets;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;
import org.springframework.core.env.PropertySource;

import java.util.HashMap;
import java.util.Map;

public class SecretsEnvironmentPostProcessor implements EnvironmentPostProcessor {

    private static final String PROPERTY_SOURCE_NAME = "secrets";

    private String secretName = "WalletWatchSecret";

    private String region="us-east-1";

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {

        try{

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

            Map<String, Object> secretProperties = new HashMap<>();

            secretProperties.put("spring.datasource.url", secrets.getRdsUrl());
            secretProperties.put("spring.datasource.username", secrets.getRdsUserName());
            secretProperties.put("spring.datasource.password", secrets.getRdsPassword());
            secretProperties.put("spring.mail.protocol", secrets.getSpringMailProtocol());
            secretProperties.put("spring.mail.host", secrets.getSpringMailHost());
            secretProperties.put("spring.mail.port", secrets.getSpringMailPort());
            secretProperties.put("spring.mail.username", secrets.getSpringMailUsername());
            secretProperties.put("spring.mail.password", secrets.getSpringMailPassword());
            secretProperties.put("spring.mail.properties.mail.smtp.auth", secrets.getSpringMailPropertiesMailSmtpAuth());
            secretProperties.put("spring.mail.properties.mail.smtp.starttls.enable", secrets.getSpringMailPropertiesMailSmtpStarttlsEnable());
            secretProperties.put("mail.smtp.starttls.enable", secrets.getMailSmtpStarttlsEnable());
            secretProperties.put("spring.mail.properties.mail.smtp.ssl.enable", secrets.getSpringMailPropertiesMailSmtpSslEnable());
            secretProperties.put("spring.mail.properties.mail.smtp.starttls.required", secrets.getSpringMailPropertiesMailSmtpStarttlsRequired());
            secretProperties.put("allowed.origin", secrets.getAllowedOrigin());
            secretProperties.put("system.email", secrets.getSystemEmail());

            PropertySource<?> propertySource = new MapPropertySource("secrets", secretProperties);
            environment.getPropertySources().addFirst(propertySource);
            Object obj=environment.getPropertySources();
        }
        catch (Exception e){
            System.out.println("Config Exception Occurred");
        }
    }
}
