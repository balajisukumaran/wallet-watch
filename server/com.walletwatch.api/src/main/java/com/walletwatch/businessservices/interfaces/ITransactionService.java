package com.walletwatch.businessservices.interfaces;

import com.walletwatch.entities.Transaction;

public interface ITransactionService {
    Transaction addTransaction(Transaction transaction);

    Transaction editTransaction(Transaction transaction);

    void deleteTransaction(Transaction transaction);
}
