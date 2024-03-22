package com.walletwatch.config;

import com.amazonaws.services.secretsmanager.AWSSecretsManager;
import com.amazonaws.services.secretsmanager.AWSSecretsManagerClientBuilder;
import com.amazonaws.services.secretsmanager.model.GetSecretValueRequest;
import com.amazonaws.services.secretsmanager.model.GetSecretValueResult;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.walletwatch.config.object.Secrets;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;

@Configuration
public class SecretsConfig {
//
//    @Value("${aws.secret.name}")
//    private String secretName;
//
//    @Value("${aws.region}")
//    private String region;
//
//    @PostConstruct
//    public void init() throws JsonProcessingException {
//        ObjectMapper objectMapper = new ObjectMapper();
//
//        // Retrieve the secret from AWS Secrets Manager
//        AWSSecretsManager client  = AWSSecretsManagerClientBuilder.standard()
//                .withRegion(region)
//                .build();
//        GetSecretValueRequest getSecretValueRequest = new GetSecretValueRequest()
//                .withSecretId(secretName);
//        GetSecretValueResult getSecretValueResult = null;
//        getSecretValueResult = client.getSecretValue(getSecretValueRequest);
//
//        // Assuming the secret is in plain text and not binary
//        String secretString = getSecretValueResult.getSecretString();
//
//        // Parse the JSON secret string and set it to a POJO
//        Secrets secrets = objectMapper.readValue(secretString, Secrets.class);
//
//        assignSecrets(secrets);
    }
//
//    private void assignSecrets(Secrets secrets) {
//        System.setProperty("spring.datasource.url", secrets.getRdsUrl());
//        System.setProperty("spring.datasource.username", secrets.getRdsUserName());
//        System.setProperty("spring.datasource.password", secrets.getRdsPassword());
//        System.setProperty("spring.mail.protocol", secrets.getSpringMailProtocol());
//        System.setProperty("spring.mail.host", secrets.getSpringMailHost());
//        System.setProperty("spring.mail.port", secrets.getSpringMailPort());
//        System.setProperty("spring.mail.username", secrets.getSpringMailUsername());
//        System.setProperty("spring.mail.password", secrets.getSpringMailPassword());
//        System.setProperty("spring.mail.properties.mail.smtp.auth", secrets.getSpringMailPropertiesMailSmtpAuth());
//        System.setProperty("spring.mail.properties.mail.smtp.starttls.enable", secrets.getSpringMailPropertiesMailSmtpStarttlsEnable());
//        System.setProperty("mail.smtp.starttls.enable", secrets.getMailSmtpStarttlsEnable());
//        System.setProperty("spring.mail.properties.mail.smtp.ssl.enable", secrets.getSpringMailPropertiesMailSmtpSslEnable());
//        System.setProperty("spring.mail.properties.mail.smtp.starttls.required", secrets.getSpringMailPropertiesMailSmtpStarttlsRequired());
//        System.setProperty("allowed.origin", secrets.getAllowedOrigin());
//        System.setProperty("system.email", secrets.getSystemEmail());
//    }
