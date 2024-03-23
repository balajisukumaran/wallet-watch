package com.walletwatch.dtos;

import lombok.*;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class TransactionDto
{
    int userId;
    int transactionId;
    String name;
    String description;
    int categoryId;
    int reminderTypeId;
    int enableReminder;
    Date paymentDate;
    float price;
    String invoiceUrl;
}