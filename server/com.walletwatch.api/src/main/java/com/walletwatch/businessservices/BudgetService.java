package com.walletwatch.businessservices;

import com.walletwatch.businessservices.interfaces.IBudgetService;
import com.walletwatch.dataaccess.repositories.BudgetRepository;
import com.walletwatch.entities.Budget;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetService implements IBudgetService {

    BudgetRepository budgetRepository;

    @Autowired
    public BudgetService(BudgetRepository _budgetRepository) {
        this.budgetRepository = _budgetRepository;
    }

    @Override
    public Budget addBudget(Budget budget) {
        return budgetRepository.save(budget);
    }

    @Override
    public void deleteBudget(Budget budget) {
        Budget budgetDb= budgetRepository.findById(budget.getId());
        budgetRepository.delete(budgetDb);
    }

    @Override
    public List<Budget> getAll(int userId) {
        List<Budget> budgets = budgetRepository.findAll();
        List<Budget> result = budgets.stream().filter(budget -> budget.getUser().getUserId() == userId).toList();
        return result;
    }
}
