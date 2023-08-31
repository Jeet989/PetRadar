package com.Group1.PetRadar.Service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.Group1.PetRadar.DTO.pet.AddPetDTO;
import com.Group1.PetRadar.Model.PetprofileModel;
import com.Group1.PetRadar.Model.User;
import com.Group1.PetRadar.Repository.PetProfileRepository;
import com.Group1.PetRadar.Repository.UserRepository;
import com.Group1.PetRadar.Service.Implementation.PetProfileServiceImplementation;
import com.Group1.PetRadar.utils.Constants;

import org.junit.Assert;

@RunWith(MockitoJUnitRunner.class)
@AutoConfigureTestDatabase(replace = Replace.NONE)
@DataJpaTest
class PetProfileServiceImplTest {
	
	@InjectMocks
	PetProfileServiceImplementation impl;
	
	@Mock
	PetProfileRepository petProfileRepoMock;
	
	@Mock
	UserRepository userRepoMock;
	
	
	@Test
	public void savePetProfileTestException() throws Exception {
		PetprofileModel dummyModel = new PetprofileModel();
		User dummyUser = new User();
		Optional<User> dummyOption = Optional.of(dummyUser);
		AddPetDTO dummyPetDTO = new AddPetDTO();
		dummyPetDTO.setPetId(Constants.DUMMY_UUID);
	
		
		when(userRepoMock.findById(any(UUID.class))).thenReturn(dummyOption);
		Assertions.assertThrows(Exception.class,()->{ impl.savePetProfile(dummyPetDTO);});
		
	}
	
	@Test
	public void updatePetProfile() {
		AddPetDTO dummyModel = new AddPetDTO();
		User dummyUser = new User();
		PetprofileModel dummyPetProfileModel = new PetprofileModel();
		Optional<PetprofileModel> dummyOption = Optional.of(dummyPetProfileModel);
		AddPetDTO dummyPetDTO = new AddPetDTO();
		dummyPetDTO.setPetId(Constants.DUMMY_UUID);

		
		when(petProfileRepoMock.findById(any(UUID.class))).thenReturn(dummyOption);
		Assertions.assertEquals(null, impl.updatePetprofile(dummyModel));
		
	}
	
	@Test
	public void updatePetProfileNotNull() {
		AddPetDTO dummyModel = new AddPetDTO();
		User dummyUser = new User();
		PetprofileModel dummyPetProfileModel = new PetprofileModel();
		Optional<PetprofileModel> dummyOption = Optional.of(dummyPetProfileModel);
		AddPetDTO dummyPetDTO = new AddPetDTO();
		dummyPetDTO.setPetId(Constants.DUMMY_UUID);

		
		dummyModel.setAllergies("notnull");
		dummyModel.setBio("notnull");
		dummyModel.setGender("notnull");
		dummyModel.setPetBreed("notnull");
		dummyModel.setPetCategory("notnull");
		Date date = new Date();
//		dummyModel.setPetDob(date);
		dummyModel.setPetHeightInCms((float)3.0);
		dummyModel.setPetIdentificationMarks("notnull");
		dummyModel.setPetName("notnull");
		byte[] bb = {0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09}; ;
//		dummyModel.setPetQrImage(bb);
//		dummyModel.setUser(dummyUser);
		dummyModel.setWeightInLbs((float)4.09);
		
		
		when(petProfileRepoMock.findById(any(UUID.class))).thenReturn(dummyOption);
		Assertions.assertThrows(Exception.class,()->{ impl.updatePetprofile(dummyModel);});
		
	}
	
	

}
