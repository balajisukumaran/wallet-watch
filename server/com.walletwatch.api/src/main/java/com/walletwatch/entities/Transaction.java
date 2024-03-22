package com.walletwatch.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "transaction")
public class Transaction {

    @Id
    @Column(name="transaction_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int transactionId;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name="userid", referencedColumnName = "userid")
    private User user;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @OneToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name="categoryId", referencedColumnName = "category_id")
    private Category categoryId;

    @OneToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name="reminderTypeId", referencedColumnName = "reminder_type_id")
    private ReminderType reminder;

    @Column(name = "enable_reminder")
    private int enableReminder;

    @Column(name = "payment_date")
    private Date paymentDate;

    @Column(name = "price")
    private float price;

    @Column(name = "invoice_url")
    private String url;
}
