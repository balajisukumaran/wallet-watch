package com.walletwatch.businessservices.interfaces;

import com.walletwatch.entities.Budget;

import java.util.List;

public interface IBudgetService {
    Budget addBudget(Budget budget);
    
    void deleteBudget(Budget budget);

    List<Budget> getAll(int userId);
}
