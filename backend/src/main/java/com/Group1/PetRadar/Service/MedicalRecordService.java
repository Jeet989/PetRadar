package com.Group1.PetRadar.Service;

import java.util.UUID;

import com.Group1.PetRadar.DTO.medicalRecord.AddPetMedicalRecordDTO;
import com.Group1.PetRadar.Model.MedicalHistory;

public interface MedicalRecordService {

    MedicalHistory saveMedical(AddPetMedicalRecordDTO medical) throws Exception;

    MedicalHistory getmedicalById(UUID id) throws Exception;

    MedicalHistory updateMedical(AddPetMedicalRecordDTO medical) throws Exception;

    String deleteMedicalById(UUID id);

}
