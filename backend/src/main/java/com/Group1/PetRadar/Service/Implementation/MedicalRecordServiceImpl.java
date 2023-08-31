package com.Group1.PetRadar.Service.Implementation;

import com.Group1.PetRadar.DTO.medicalRecord.AddPetMedicalRecordDTO;
import com.Group1.PetRadar.Model.MedicalHistory;
import com.Group1.PetRadar.Repository.MedicalRecordRepository;
import com.Group1.PetRadar.Repository.PetProfileRepository;
import com.Group1.PetRadar.Service.MedicalRecordService;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MedicalRecordServiceImpl implements MedicalRecordService {

    @Autowired
    MedicalRecordRepository medicalRecordRepository;

    @Autowired
    PetProfileRepository perPetProfileRepository;

    @Override
    public MedicalHistory saveMedical(AddPetMedicalRecordDTO medicalrecord) throws Exception {
        try {
            MedicalHistory newRecord = new MedicalHistory();
            newRecord.setVetVisitDate(medicalrecord.getVetVisitDate());
            newRecord.setSymptoms(medicalrecord.getSymptoms());
            newRecord.setVetName(medicalrecord.getVetName());
            newRecord.setVaccinationDate(medicalrecord.getVaccinationDate());
            newRecord.setSurgery(medicalrecord.getSurgery());
            newRecord.setMedication(medicalrecord.getMedication());
            newRecord.setPet(perPetProfileRepository.findById(medicalrecord.getPetId()).get());
            return medicalRecordRepository.save(newRecord);
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Error while saving medical record: " + e.getMessage());
        }
    }

    @Override
    public MedicalHistory getmedicalById(UUID id) throws Exception {
        MedicalHistory medicalHistory = null;
        try {
            if (!medicalRecordRepository.existsById(id)) {
                throw new Exception("Pet not found");
            }
            medicalHistory = medicalRecordRepository.findById(id).get();
            return medicalHistory;

        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("No medical history found for given UUID");
        }
    }

    @Override
    public MedicalHistory updateMedical(AddPetMedicalRecordDTO medical) throws Exception {
        try {
            MedicalHistory m = medicalRecordRepository.findById(medical.getMedicalRecordId()).orElse(null);
            m.setMedication(medical.getMedication());
            m.setSurgery(medical.getSurgery());
            m.setSymptoms(medical.getSymptoms());
            m.setVetName(medical.getVetName());
            m.setVaccinationDate(medical.getVaccinationDate());
            return medicalRecordRepository.save(m);
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Error while saving medical record: " + e.getMessage());
        }
    }

    public String deleteMedicalById(UUID id) {
        medicalRecordRepository.deleteById(id);
        return "Deleted";
    }

}