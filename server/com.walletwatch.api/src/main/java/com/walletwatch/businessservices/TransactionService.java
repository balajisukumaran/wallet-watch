package com.walletwatch.businessservices;

import com.walletwatch.businessservices.interfaces.ITransactionService;
import com.walletwatch.dataaccess.repositories.TransactionRepository;
import com.walletwatch.entities.Transaction;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TransactionService implements ITransactionService {

    TransactionRepository transactionRepository;

    @Autowired
    public TransactionService(TransactionRepository _transactionRepository) {
        this.transactionRepository = _transactionRepository;
    }

    @Override
    public Transaction addTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @Override
    public Transaction editTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @Override
    public void deleteTransaction(Transaction transaction) {
        Transaction transactionDb= transactionRepository.findByTransactionId(transaction.getTransactionId());
        transactionRepository.delete(transactionDb);
    }
}
