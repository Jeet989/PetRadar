package com.Group1.PetRadar.DTO.pet;

import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AddPetDTO {

    private UUID petId;
    private String petName;
    private String petBreed;
    private int age;
    private String petCategory;
    private String gender;
    private String bio;
    private Float petHeightInCms;
    private Float weightInLbs;
    private String petIdentificationMarks;
    private String allergies;
    private String userId;
    private MultipartFile image;

    public void setPetId(String petId) {
        this.petId = UUID.fromString(petId);
    }

    public UUID getUserId() {
        return UUID.fromString(this.userId);
    }

}
