package com.Group1.PetRadar.DTO.medicalRecord;

import java.util.Date;
import java.util.UUID;

public class AddPetMedicalRecordDTO {
    private UUID medicalRecordId;
    private Date vetVisitDate;
    private String symptoms;
    private String vetName;
    private Date vaccinationDate;
    private String surgery;
    private String medication;

    private UUID petId;

    // default constructor
    public AddPetMedicalRecordDTO() {
    }

    // getter and setter methods
    public UUID getMedicalRecordId() {
        return medicalRecordId;
    }

    public void setMedicalRecordId(String medicalRecordId) {
        this.medicalRecordId = UUID.fromString(medicalRecordId);
    }

    public Date getVetVisitDate() {
        return vetVisitDate;
    }

    public void setVetVisitDate(String vetVisitDate) {
        this.vetVisitDate = new Date(vetVisitDate);
    }

    public String getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(String symptoms) {
        this.symptoms = symptoms;
    }

    public String getVetName() {
        return vetName;
    }

    public void setVetName(String vetName) {
        this.vetName = vetName;
    }

    public Date getVaccinationDate() {
        return vaccinationDate;
    }

    public void setVaccinationDate(String vaccinationDate) {
        this.vaccinationDate = new Date(vaccinationDate);
    }

    public String getSurgery() {
        return surgery;
    }

    public void setSurgery(String surgery) {
        this.surgery = surgery;
    }

    public String getMedication() {
        return medication;
    }

    public void setMedication(String medication) {
        this.medication = medication;
    }

    public UUID getPetId() {
        return petId;
    }

    public void setPetId(String petId) {
        this.petId = UUID.fromString(petId);
    }
}
