package com.Group1.PetRadar.Model;

import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.transaction.Transactional;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Transactional
@NoArgsConstructor
@Table(name = "pet_profile")
@Getter
@Setter
@Entity()
public class PetprofileModel {
    @Id()
    @GeneratedValue(strategy = GenerationType.UUID)
    @JoinColumn(name = "id")
    UUID petId;
    String petName;
    String petBreed;
    int age;
    String petCategory;
    String gender;
    String bio;
    Float petHeightInCms;
    Float weightInLbs;
    String petIdentificationMarks;
    String allergies;
    String ImageUrl;

    @Lob
    @Column(name = "image_bytes", columnDefinition = "BLOB")
    byte[] petQrImage;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_id", referencedColumnName = "userId")
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "pet", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MedicalHistory> medicalHistories;

    // Getters and setters
    public UUID getPetId() {
        return petId;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<MedicalHistory> getMedicalHistories() {
        return medicalHistories;
    }

    public String getImageUrl() {
        return this.ImageUrl;
    }

    public void setImageUrl(String ImageUrl) {
        this.ImageUrl = ImageUrl;
    }
}