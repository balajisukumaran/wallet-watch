package com.walletwatch.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "reminder_type")
public class ReminderType {

    @Id
    @Column(name="reminder_type_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reminderTypeId;

    @Column(name = "type")
    private String type;

}
