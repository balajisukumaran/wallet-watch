package com.walletwatch.businessservices;

import com.walletwatch.businessservices.interfaces.IIncomeService;
import com.walletwatch.dataaccess.repositories.IncomeRepository;
import com.walletwatch.entities.Income;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IncomeService implements IIncomeService {

    IncomeRepository incomeRepository;

    @Autowired
    public IncomeService(IncomeRepository _incomeRepository) {
        this.incomeRepository = _incomeRepository;
    }

    @Override
    public Income addIncome(Income income) {
        return incomeRepository.save(income);
    }

    @Override
    public void deleteIncome(Income income) {
        Income incomeDb= incomeRepository.findById(income.getId());
        incomeRepository.delete(incomeDb);
    }

    @Override
    public List<Income> getAll(int userId) {
        List<Income> incomes = incomeRepository.findAll();
        List<Income> result = incomes.stream().filter(income -> income.getUser().getUserId() == userId).toList();
        return result;
    }
}
