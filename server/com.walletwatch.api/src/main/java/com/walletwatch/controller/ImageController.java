package com.walletwatch.controller;

import com.walletwatch.config.UserAuthenticationProvider;
import com.walletwatch.dtos.UserDto;
import com.walletwatch.entities.Budget;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/image")
public class ImageController {

    private final UserAuthenticationProvider userAuthenticationProvider;
    private final S3Client s3Client;

    private final String bucketName = "wallet-watch-blob-storage-590183799919-us-east-1";

    @Autowired
    public ImageController(UserAuthenticationProvider userAuthenticationProvider) {
        this.userAuthenticationProvider = userAuthenticationProvider;
        this.s3Client = S3Client.builder()
                .region(Region.US_EAST_1) // Replace with your region
                .credentialsProvider(DefaultCredentialsProvider.create())
                .build();
    }

    @PostMapping("/upload")
    public String UploadProfile(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestParam("file") MultipartFile file) {
        try {
            UserDto userDto = userAuthenticationProvider.getUserByToken(authorizationHeader.split(" ")[1]);
            s3Client.putObject(PutObjectRequest.builder()
                            .bucket(bucketName)
                            .key(String.valueOf(userDto.getUserId()))
                            .build(),
                    RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

            return "File uploaded successfully";
        } catch (IOException e) {

            e.printStackTrace();
            return "Upload failed";
        }
    }

    @GetMapping("/download")
    public ResponseEntity<ByteArrayResource> Download(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        UserDto userDto = userAuthenticationProvider.getUserByToken(authorizationHeader.split(" ")[1]);
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(String.valueOf(userDto.getUserId()))
                .build();

        try {
            ResponseBytes<GetObjectResponse> objectBytes = s3Client.getObjectAsBytes(getObjectRequest);
            ByteArrayResource resource = new ByteArrayResource(objectBytes.asByteArray());

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + String.valueOf(userDto.getUserId()) + "\"")
                    .body(resource);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
