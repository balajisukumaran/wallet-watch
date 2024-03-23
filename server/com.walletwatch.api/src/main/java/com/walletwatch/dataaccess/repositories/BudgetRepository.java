package com.walletwatch.dataaccess.repositories;

import com.walletwatch.entities.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Integer> {
    public Budget findById(int budgetId);
}