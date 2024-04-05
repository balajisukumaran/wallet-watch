package com.walletwatch.controller;

import com.walletwatch.businessservices.interfaces.ITransactionService;
import com.walletwatch.businessservices.interfaces.IUserService;
import com.walletwatch.config.UserAuthenticationProvider;
import com.walletwatch.controller.transformer.DtoToEntity;
import com.walletwatch.dtos.TransactionDto;
import com.walletwatch.dtos.UserDto;
import com.walletwatch.entities.Transaction;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.core.SdkBytes;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.textract.TextractClient;
import software.amazon.awssdk.services.textract.model.*;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api/transaction")
public class TransactionController {

    ITransactionService transactionService;
    IUserService userService;
    private final UserAuthenticationProvider userAuthenticationProvider;

    @Autowired
    public TransactionController(ITransactionService _transactionService, UserAuthenticationProvider userAuthenticationProvider, IUserService _userService) {
        this.transactionService = _transactionService;
        this.userAuthenticationProvider = userAuthenticationProvider;
        this.userService = _userService;
    }

    @GetMapping("/get")
    public ResponseEntity<List<Transaction>> getAllTransaction(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        UserDto userDto = userAuthenticationProvider.getUserByToken(authorizationHeader.split(" ")[1]);

        List<Transaction> transactions = transactionService.getAll(userDto.getUserId());

        return ResponseEntity.ok(transactions);
    }

    @PostMapping("/add")
    public ResponseEntity<Transaction> AddTransaction(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody TransactionDto transactionDto) {
        UserDto userDto = userAuthenticationProvider.getUserByToken(authorizationHeader.split(" ")[1]);
        transactionDto.setUserId(userDto.getUserId());
        Transaction transaction = DtoToEntity.ToEntity(transactionDto);
        return ResponseEntity.ok(transactionService.addTransaction(transaction));
    }

    @PostMapping("/edit")
    public ResponseEntity<Transaction> EditTransaction(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody TransactionDto transactionDto) {
        UserDto userDto = userAuthenticationProvider.getUserByToken(authorizationHeader.split(" ")[1]);
        transactionDto.setUserId(userDto.getUserId());
        Transaction transaction = DtoToEntity.ToEntity(transactionDto);
        return ResponseEntity.ok(transactionService.editTransaction(transaction));
    }

    @PostMapping("/delete")
    public ResponseEntity<Transaction> DeleteTransaction(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody TransactionDto transactionDto) {
        UserDto userDto = userAuthenticationProvider.getUserByToken(authorizationHeader.split(" ")[1]);
        transactionDto.setUserId(userDto.getUserId());
        Transaction transaction = DtoToEntity.ToEntity(transactionDto);
        try {
            transactionService.deleteTransaction(transaction);
        } catch (Exception e) {
            return null;
        }
        return ResponseEntity.ok(transaction);
    }

    @PostMapping("/upload")
    public ResponseEntity<Transaction> UploadTransaction(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestParam("file") MultipartFile file) throws IOException {
        Region region = Region.US_EAST_1; // Specify the AWS region
        TextractClient textractClient = TextractClient.builder()
                .region(region)
                .credentialsProvider(DefaultCredentialsProvider.create())
                .build();

        // Convert MultipartFile to SdkBytes
        SdkBytes documentBytes = SdkBytes.fromInputStream(file.getInputStream());

        // Prepare the request
        Document document = Document.builder()
                .bytes(documentBytes)
                .build();
        AnalyzeDocumentRequest request = AnalyzeDocumentRequest.builder()
                .document(document)
                .featureTypes(FeatureType.FORMS, FeatureType.TABLES) // Specify the features you want
                .build();

        // Call AWS Textract
        AnalyzeDocumentResponse response = textractClient.analyzeDocument(request);
        Float Total = 0f;
        StringBuilder Name = new StringBuilder();
        for (int i = 0; i < response.blocks().size(); i++) {
            String line = response.blocks().get(i).text();

            if(i<3){
                Name.append(line).append(" ");
            }
            else if (line != null && line.contains("TOTAL") && !line.contains("SUBTOTAL")) {
                String s = response.blocks().get(i + 1).text();
                Total = Float.parseFloat(s);
                break;
            }
        }
        textractClient.close();

        TransactionDto transactionDto = new TransactionDto();
        transactionDto.setName(String.valueOf(Name).replace("null","").trim());
        transactionDto.setPrice(Total);

        UserDto userDto = userAuthenticationProvider.getUserByToken(authorizationHeader.split(" ")[1]);
        transactionDto.setUserId(userDto.getUserId());
        transactionDto.setCategoryId(4);
        transactionDto.setReminderTypeId(1);
        transactionDto.setDescription("Shopping");
        transactionDto.setPaymentDate(DateTime.now().toDate());

        Transaction transaction = DtoToEntity.ToEntity(transactionDto);
        return ResponseEntity.ok(transactionService.addTransaction(transaction));
    }

}
