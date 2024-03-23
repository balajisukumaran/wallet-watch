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
@Table(name = "budget")
public class Budget {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "is_percentage")
    private int isPercentage;

    @Column(name = "value")
    private float value;

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
}