package com.Group1.PetRadar.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "Pet_Medical_History")
public class MedicalHistory {

    @Id()
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID medicalRecordId;

    Date vetVisitDate;

    String symptoms;

    String vetName;

    Date vaccinationDate;

    String surgery;

    String medication;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "pet_profile_id", referencedColumnName = "petId")
    private PetprofileModel pet;

    public UUID getMedicalRecordId() {
        return this.medicalRecordId;
    }

    public Date getVetVisitDate() {
        return vetVisitDate;
    }

    public void setVetVisitDate(Date vetVisitDate) {
        this.vetVisitDate = vetVisitDate;
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

    public void setVaccinationDate(Date vaccinationDate) {
        this.vaccinationDate = vaccinationDate;
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

    public PetprofileModel getPet() {
        return pet;
    }

    public void setPet(PetprofileModel pet) {
        this.pet = pet;
    }
}
