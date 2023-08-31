package com.Group1.PetRadar.DTO.post;

import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import com.Group1.PetRadar.Model.Location;

public class AddPostDTO extends Location {

    private String description;
    private String userName;
    private String userProfilePicture;
    private Date postDate;
    private UUID userId;
    private MultipartFile image;
    private BigDecimal longitude;
    private BigDecimal latitude;

    // Default constructor
    public AddPostDTO() {
    }

    // Getters and setters
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getPostDate() {
        return postDate;
    }

    public void setPostDate(String postDate) {
        try {
            this.postDate = new Date(postDate);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public UUID getUserId() {
        return this.userId;
    }

    public void setUserId(String userId) {
        this.userId = UUID.fromString(userId);
    }

    public MultipartFile getImage() {
        return this.image;
    }

    public void setImage(MultipartFile image) {
        this.image = image;
    }

    public BigDecimal getLatitude() {
        return latitude;
    }

    public void setLatitude(BigDecimal latitude) {
        this.latitude = latitude;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }

    public String getUserProfilePicture() {
        return userProfilePicture;
    }

    public void setUserProfilePicture(String userProfilePicture) {
        this.userProfilePicture = userProfilePicture;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}