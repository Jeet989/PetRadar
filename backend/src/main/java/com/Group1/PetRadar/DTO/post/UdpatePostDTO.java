package com.Group1.PetRadar.DTO.post;

import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

@NoArgsConstructor
public class UdpatePostDTO {

    private String description;
    private Date postDate;
    private MultipartFile image;

    private String id;

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

    public UUID getId() {
        return UUID.fromString(id);
    }

    public void setId(String id) {
        this.id = id;
    }

    public MultipartFile getImage() {
        return this.image;
    }

    public void setImage(MultipartFile image) {
        this.image = image;
    }
}