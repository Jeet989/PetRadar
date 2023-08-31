package com.Group1.PetRadar.Repository;

import com.Group1.PetRadar.Model.MedicalHistory;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

public interface MedicalRecordRepository extends CrudRepository<MedicalHistory, UUID> {
}
