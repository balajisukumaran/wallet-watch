package org.walletwatch;

import org.walletwatch.object.MessageBody;

import java.util.HashMap;
import java.util.List;

import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.ses.SesClient;
import software.amazon.awssdk.services.ses.model.SendEmailRequest;
import software.amazon.awssdk.services.ses.model.Destination;
import software.amazon.awssdk.services.ses.model.Content;
import software.amazon.awssdk.services.ses.model.Body;
import software.amazon.awssdk.services.ses.model.Message;

public class EmailService {

    public static void sendEmail(HashMap<String, List<MessageBody>> messageBodies) {
        SesClient sesClient = SesClient.builder()
                .region(Region.US_EAST_1) // Choose the appropriate region
                .build();

        for (String email : messageBodies.keySet()) {
            List<MessageBody> messageBodiesList = messageBodies.get(email);
            try {
                StringBuilder sb = new StringBuilder();
                for (MessageBody messageBody : messageBodiesList) {
                    sb.append(messageBody.getCategoryName()).append(" - $").append(messageBody.getOverspend()).append("\n");
                }

                SendEmailRequest request = SendEmailRequest.builder()
                        .source("balajisukumaranofficial@gmail.com") // Your verified "From" address
                        .destination(Destination.builder()
                                .toAddresses(email) // Replace with recipient address
                                .build())
                        .message(Message.builder()
                                .subject(Content.builder().data("Wallet Watch Budget Overspend Alert").build())
                                .body(Body.builder().text(Content.builder().data("You've overspent on the following!\n" + String.valueOf(sb)).build()).build())
                                .build())
                        .build();

                sesClient.sendEmail(request);
                System.out.println("Email sent successfully!");
            } catch (Exception e) {
                System.err.println(e.getMessage());
            } finally {
                sesClient.close();
            }
        }
    }
}
