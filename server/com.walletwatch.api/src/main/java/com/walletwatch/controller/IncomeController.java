package com.walletwatch.controller;

import com.walletwatch.businessservices.interfaces.IIncomeService;
import com.walletwatch.businessservices.interfaces.IUserService;
import com.walletwatch.config.UserAuthenticationProvider;
import com.walletwatch.dtos.UserDto;
import com.walletwatch.entities.Income;
import com.walletwatch.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/income")
public class IncomeController {

    IIncomeService incomeService;
    IUserService userService;
    private final UserAuthenticationProvider userAuthenticationProvider;

    @Autowired
    public IncomeController(IIncomeService _incomeService, UserAuthenticationProvider userAuthenticationProvider, IUserService _userService) {
        this.incomeService = _incomeService;
        this.userAuthenticationProvider = userAuthenticationProvider;
        this.userService = _userService;
    }

    @GetMapping("/get")
    public ResponseEntity<List<Income>> getAllIncome(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        UserDto userDto = userAuthenticationProvider.getUserByToken(authorizationHeader.split(" ")[1]);

        List<Income> incomes = incomeService.getAll(userDto.getUserId());

        return ResponseEntity.ok(incomes);
    }

    @PostMapping("/add")
    public ResponseEntity<Income> AddIncome(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody Income income) {
        UserDto userDto = userAuthenticationProvider.getUserByToken(authorizationHeader.split(" ")[1]);
        income.setUser(new User());
        income.getUser().setUserId(userDto.getUserId());
        return ResponseEntity.ok(incomeService.addIncome(income));
    }

    @PostMapping("/delete")
    public ResponseEntity<Income> DeleteIncome(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody Income income) {
        UserDto userDto = userAuthenticationProvider.getUserByToken(authorizationHeader.split(" ")[1]);
        income.setUser(new User());
        income.getUser().setUserId(userDto.getUserId());

        try{
            incomeService.deleteIncome(income);
        }
        catch (Exception e){
            return null;
        }
        return ResponseEntity.ok(income);
    }
}
