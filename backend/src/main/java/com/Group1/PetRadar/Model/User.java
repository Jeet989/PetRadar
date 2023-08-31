package com.Group1.PetRadar.Model;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.transaction.Transactional;
import lombok.NoArgsConstructor;

@Entity
@Transactional
@NoArgsConstructor
@Table(name = "user")
public class User {

	@Id()
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID userId;
	private String email;
	private String firstName;
	private String lastName;
	private String profileUrl;
	private String address;
	private String city;
	private String pincode;
	private Long phoneNumber;
	private String ImageUrl;

	@JsonIgnore
	private String password;
	private String onesignalUserId;

	@Column(precision = 10, scale = 6)
	private BigDecimal latitude;

	@Column(precision = 10, scale = 6)
	private BigDecimal longitude;

	@JsonIgnore
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<PetprofileModel> pets;

	@JsonIgnore
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<PostModel> posts;

	// Getters and setters
	public UUID getUserId() {
		return userId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getProfileUrl() {
		return profileUrl;
	}

	public void setProfileUrl(String profileUrl) {
		this.profileUrl = profileUrl;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public Long getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(Long phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<PetprofileModel> getPets() {
		return pets;
	}

	public void setPets(List<PetprofileModel> pets) {
		this.pets = pets;
	}

	public void setImageUrl(String imagexUrl) {
		ImageUrl = imagexUrl;
	}

	public String getImageUrl() {
		return this.ImageUrl;
	}

	public List<PostModel> getPosts() {
		return this.posts;
	}

	public void setPosts(List<PostModel> posts) {
		this.posts = posts;
	}

	public void setLatitude(BigDecimal latitude) {
		this.latitude = latitude;
	}

	public BigDecimal getLatitude() {
		return latitude;
	}

	public void setLongitude(BigDecimal longitude) {
		this.longitude = longitude;
	}

	public BigDecimal getLongitude() {
		return longitude;
	}

	public String getOnesignalUserId() {
		return onesignalUserId;
	}

	public void setOnesignalUserId(String onesignalUserId) {
		this.onesignalUserId = onesignalUserId;
	}

}