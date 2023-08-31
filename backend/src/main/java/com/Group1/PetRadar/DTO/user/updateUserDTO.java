package com.Group1.PetRadar.DTO.user;

import java.math.BigDecimal;

import org.springframework.web.multipart.MultipartFile;

import com.Group1.PetRadar.Model.Location;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class updateUserDTO extends Location {

    private String firstName;
    private String lastName;
    private String address;
    private String city;
    private String Pincode;
    private Long phoneNumber;
    private MultipartFile file;
    private String oneSignalUserId;

}