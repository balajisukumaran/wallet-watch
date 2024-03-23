package com.walletwatch.businessservices.interfaces;

import com.walletwatch.entities.Transaction;

import java.util.List;

public interface ITransactionService {
    Transaction addTransaction(Transaction transaction);

    Transaction editTransaction(Transaction transaction);

    void deleteTransaction(Transaction transaction);

    List<Transaction> getAll(int userId);
}
