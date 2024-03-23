package com.walletwatch.businessservices.interfaces;

import com.walletwatch.entities.Income;

import java.util.List;

public interface IIncomeService {
    Income addIncome(Income income);
    
    void deleteIncome(Income income);

    List<Income> getAll(int userId);
}
