package com.walletwatch.dtos;

import java.util.Date;
public record TransactionDto (int userId, int transactionId, String name, String description, int categoryId, int reminderTypeId, int enableReminder, Date paymentDate, float price, String invoiceUrl) {

}