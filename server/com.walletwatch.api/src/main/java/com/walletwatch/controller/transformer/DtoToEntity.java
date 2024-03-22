package com.walletwatch.controller.transformer;

import com.walletwatch.dtos.TransactionDto;
import com.walletwatch.entities.*;

public class DtoToEntity {
    public static Transaction ToEntity(TransactionDto transactionDto){
        Transaction transaction = new Transaction();

        User user=new User();
        Category category= new Category();
        ReminderType reminderType = new ReminderType();

        transaction.setUser(user);
        transaction.setCategoryId(category);
        transaction.setReminder(reminderType);

        transaction.setTransactionId(transactionDto.transactionId());
        transaction.getUser().setUserId(transactionDto.userId());
        transaction.getCategoryId().setCategoryId(transactionDto.categoryId());
        transaction.getReminder().setReminderTypeId(transactionDto.reminderTypeId());
        transaction.setName(transactionDto.name());
        transaction.setDescription(transactionDto.description());
        transaction.setEnableReminder(transactionDto.enableReminder());
        transaction.setPaymentDate(transactionDto.paymentDate());
        transaction.setPrice(transactionDto.price());
        transaction.setUrl(transactionDto.invoiceUrl());

        return transaction;
    }
}
