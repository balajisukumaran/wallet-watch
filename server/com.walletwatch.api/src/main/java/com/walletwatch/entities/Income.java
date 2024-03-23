package com.walletwatch.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "income")
public class Income {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "value")
    private float value;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name="userid", referencedColumnName = "userid")
    private User user;

    @Column(name = "income_name")
    private String name;

    @Column(name = "description")
    private String description;

}