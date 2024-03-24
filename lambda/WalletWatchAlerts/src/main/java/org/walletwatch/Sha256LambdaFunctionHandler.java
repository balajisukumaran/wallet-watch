package org.walletwatch;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import java.util.Map;
import java.util.TreeMap;

import com.fasterxml.jackson.databind.ObjectMapper;

public class Sha256LambdaFunctionHandler implements RequestHandler<Map<String, String>, Map<String, Object>> {

    @Override
    public Map<String, Object> handleRequest(Map<String, String> event, Context context) {
        try {

            String valueToHash = event.get("value");
            String url = event.get("course_uri");

            String hashedValue = HashingService.hashSHA256(valueToHash);

            TreeMap<String, Object> response = new TreeMap<>();
            response.put("banner", "B00948977");
            response.put("result", hashedValue);
            response.put("arn", "arn:aws:lambda:us-east-1:590183799919:function:encryptSha256");
            response.put("action", "sha256");
            response.put("value", valueToHash);

            ObjectMapper objectMapper = new ObjectMapper();
            String jsonBody = objectMapper.writeValueAsString(response);

            HttpClient client = HttpClient.newBuilder()
                    .version(HttpClient.Version.HTTP_1_1)
                    .followRedirects(HttpClient.Redirect.NORMAL)
                    .connectTimeout(Duration.ofSeconds(40))
                    .build();

            HttpRequest postRequest = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                    .build();


            HttpResponse<String> postResponse = client.send(postRequest, HttpResponse.BodyHandlers.ofString());
            context.getLogger().log("Response status code: " + postResponse.statusCode());
            context.getLogger().log("Response body: " + postResponse.body());
            return response;

        } catch (Exception e) {
            context.getLogger().log("Exception occurred: " + e.getMessage());
        }

        return null;
    }
}