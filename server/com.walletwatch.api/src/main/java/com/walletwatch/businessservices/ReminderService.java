package com.walletwatch.businessservices;

import com.walletwatch.businessservices.interfaces.IReminderService;
import com.walletwatch.dataaccess.repositories.ReminderRepository;
import com.walletwatch.entities.ReminderType;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReminderService implements IReminderService {

    ReminderRepository reminderRepository;

    @Autowired
    public ReminderService(ReminderRepository _reminderRepository) {
        this.reminderRepository = _reminderRepository;
    }
    @Override
    public List<ReminderType> getAll() {
        return reminderRepository.findAll();
    }
}