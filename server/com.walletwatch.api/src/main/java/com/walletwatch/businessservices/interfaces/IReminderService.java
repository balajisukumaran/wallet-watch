package com.walletwatch.businessservices.interfaces;

import com.walletwatch.entities.ReminderType;

import java.util.List;


public interface IReminderService {

    List<ReminderType> getAll();
}
