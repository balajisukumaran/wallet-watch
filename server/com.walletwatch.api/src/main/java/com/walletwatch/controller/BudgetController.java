package com.walletwatch.controller;

import com.walletwatch.businessservices.interfaces.IBudgetService;
import com.walletwatch.businessservices.interfaces.IUserService;
import com.walletwatch.config.UserAuthenticationProvider;
import com.walletwatch.dtos.UserDto;
import com.walletwatch.entities.Budget;
import com.walletwatch.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budget")
@CrossOrigin(origins = "*")
public class BudgetController {

    IBudgetService budgetService;
    IUserService userService;
    private final UserAuthenticationProvider userAuthenticationProvider;

    @Autowired
    public BudgetController(IBudgetService _budgetService, UserAuthenticationProvider userAuthenticationProvider, IUserService _userService) {
        this.budgetService = _budgetService;
        this.userAuthenticationProvider = userAuthenticationProvider;
        this.userService = _userService;
    }

    @GetMapping("/get")
    @CrossOrigin(origins = "*")
    public ResponseEntity<List<Budget>> getAllBudget(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        UserDto userDto = userAuthenticationProvider.getUserByToken(authorizationHeader.split(" ")[1]);

        List<Budget> budgets = budgetService.getAll(userDto.getUserId());

        return ResponseEntity.ok(budgets);
    }

    @PostMapping("/add")
    @CrossOrigin(origins = "*")
    public ResponseEntity<Budget> AddBudget(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody Budget budget) {
        UserDto userDto = userAuthenticationProvider.getUserByToken(authorizationHeader.split(" ")[1]);
        budget.setUser(new User());
        budget.getUser().setUserId(userDto.getUserId());
        return ResponseEntity.ok(budgetService.addBudget(budget));
    }

    @PostMapping("/delete")
    @CrossOrigin(origins = "*")
    public ResponseEntity<Budget> DeleteBudget(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody Budget budget) {
        UserDto userDto = userAuthenticationProvider.getUserByToken(authorizationHeader.split(" ")[1]);
        budget.setUser(new User());
        budget.getUser().setUserId(userDto.getUserId());

        try{
            budgetService.deleteBudget(budget);
        }
        catch (Exception e){
            return null;
        }
        return ResponseEntity.ok(budget);
    }
}
