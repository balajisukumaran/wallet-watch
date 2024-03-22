package com.walletwatch.dataaccess.repositories;

import com.walletwatch.entities.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    Transaction findByTransactionId(int transactionId);
}