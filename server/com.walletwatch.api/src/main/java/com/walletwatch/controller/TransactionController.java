package com.walletwatch.controller;

import com.walletwatch.businessservices.interfaces.ITransactionService;
import com.walletwatch.controller.transformer.DtoToEntity;
import com.walletwatch.dtos.NewPasswordDto;
import com.walletwatch.dtos.TransactionDto;
import com.walletwatch.entities.Transaction;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/transaction")
public class TransactionController {

    ITransactionService transactionService;

    @Autowired
    public TransactionController(ITransactionService _transactionService) {
        this.transactionService = _transactionService;
    }

    @PostMapping("/add")
    public ResponseEntity<Transaction> AddTransaction(@RequestBody TransactionDto transactionDto) {
        Transaction transaction = DtoToEntity.ToEntity(transactionDto);
        return ResponseEntity.ok(transactionService.addTransaction(transaction));
    }

    @PostMapping("/edit")
    public ResponseEntity<Transaction> EditTransaction(@RequestBody TransactionDto transactionDto) {
        Transaction transaction = DtoToEntity.ToEntity(transactionDto);
        return ResponseEntity.ok(transactionService.editTransaction(transaction));
    }

    @PostMapping("/delete")
    public ResponseEntity<Transaction> DeleteTransaction(@RequestBody TransactionDto transactionDto) {
        Transaction transaction = DtoToEntity.ToEntity(transactionDto);
        transactionService.deleteTransaction(transaction);
        return ResponseEntity.ok(transaction);
    }
}
