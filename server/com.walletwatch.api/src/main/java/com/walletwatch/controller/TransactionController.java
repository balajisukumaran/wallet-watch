package com.walletwatch.controller;

import com.walletwatch.businessservices.interfaces.ITransactionService;
import com.walletwatch.businessservices.interfaces.IUserService;
import com.walletwatch.config.UserAuthenticationProvider;
import com.walletwatch.controller.transformer.DtoToEntity;
import com.walletwatch.dtos.TransactionDto;
import com.walletwatch.dtos.UserDto;
import com.walletwatch.entities.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
        try{
            transactionService.deleteTransaction(transaction);
        }
        catch (Exception e){
            return null;
        }
        return ResponseEntity.ok(transaction);
    }
}
