package com.walletwatch.controller.transformer;

import com.walletwatch.dtos.TransactionDto;
import com.walletwatch.entities.*;
import java.util.*;

public class DtoToEntity {
    public static Transaction ToEntity(TransactionDto transactionDto){
        Transaction transaction = new Transaction();

        User user=new User();
        Category category= new Category();
        ReminderType reminderType = new ReminderType();

        transaction.setUser(user);
        transaction.setCategoryId(category);
        transaction.setReminder(reminderType);

        transaction.setTransactionId(transactionDto.getTransactionId());
        transaction.getUser().setUserId(transactionDto.getUserId());
        transaction.getCategoryId().setCategoryId(transactionDto.getCategoryId());
        transaction.getReminder().setReminderTypeId(transactionDto.getReminderTypeId());
        transaction.setName(transactionDto.getName());
        transaction.setDescription(transactionDto.getDescription());
        transaction.setEnableReminder(transactionDto.getEnableReminder());
        transaction.setPaymentDate(transactionDto.getPaymentDate());
        transaction.setPrice(transactionDto.getPrice());
        transaction.setUrl(transactionDto.getInvoiceUrl());

        return transaction;
    }
}
