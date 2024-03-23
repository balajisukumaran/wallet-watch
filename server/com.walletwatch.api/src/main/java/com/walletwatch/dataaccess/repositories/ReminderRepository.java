package com.walletwatch.dataaccess.repositories;

import com.walletwatch.entities.ReminderType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReminderRepository extends JpaRepository<ReminderType, Integer> {
}