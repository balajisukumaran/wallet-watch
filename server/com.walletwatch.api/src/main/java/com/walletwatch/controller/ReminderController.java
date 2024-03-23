package com.walletwatch.controller;

import com.walletwatch.businessservices.interfaces.IReminderService;
import com.walletwatch.entities.ReminderType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reminder")
public class ReminderController {

    IReminderService reminderService;

    @Autowired
    public ReminderController(IReminderService _reminderService) {
        this.reminderService = _reminderService;
    }

    @GetMapping("/get")
    public ResponseEntity<List<ReminderType>> getReminder(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader) {
        return ResponseEntity.ok(reminderService.getAll());
    }
}
