package com.Group1.PetRadar.Controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

import org.junit.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import com.Group1.PetRadar.DTO.pet.AddPetDTO;
import com.Group1.PetRadar.Model.PetprofileModel;
import com.Group1.PetRadar.Service.PetProfileService;
import com.Group1.PetRadar.utils.Constants;

@RunWith(MockitoJUnitRunner.class)
@AutoConfigureTestDatabase(replace = Replace.NONE)
@DataJpaTest
class PetProfileControllerTest {
	
	@InjectMocks
	PetprofileController petProfileController;
	
	@Mock
	PetProfileService petProfileServiceMock;
	
	@Mock
	MultipartFile multipartFileMock;
	

	@Test
	public void createPetprofilePositiveTest1() throws Exception {
		AddPetDTO dummyPetProfile = new AddPetDTO();
		Map<String, String> paramList = new HashMap<String,String>();
		paramList.put("petName", "recordId");
		paramList.put("petBreed", "visitDate");
		paramList.put("age", "34");
		paramList.put("petCategory", "vetname");
		paramList.put("gender", "17-10-1997");
		paramList.put("bio", "surgery");
		paramList.put("petHeightInCms", "3.0");
		paramList.put("weightInLbs", "3.0");
		paramList.put("petIdentificationMarks", "4.0");
		paramList.put("allergies", "surgery");
		paramList.put("petId", Constants.DUMMY_UUID);
		
		byte[] b = new byte[20];
		new Random().nextBytes(b);		
		MultipartFile multiPartFile = new MockMultipartFile("mock", b);
		
		Assert.assertEquals(Constants.expectedStatusCode, petProfileController.createPetprofile(paramList, multiPartFile).getStatusCode().value());
	}
	
	@Test
	public void createPetprofileNegativeTest1() throws Exception {
		AddPetDTO dummyPetProfile = new AddPetDTO();
		Map<String, String> paramList = new HashMap<String,String>();
		paramList.put("medicalRecordId", "recordId");
		paramList.put("vetVisitDate", "visitDate");
		paramList.put("symptoms", "symptoms");
		paramList.put("vetName", "vetname");
		paramList.put("vaccinationDate", "17-10-1997");
		paramList.put("surgery", "surgery");
		paramList.put("medication", "medication");
		
		PetprofileModel dummyPet = new PetprofileModel();
		
		byte[] b = new byte[20];
		new Random().nextBytes(b);		
		MultipartFile multiPartFile = new MockMultipartFile("mock", b);
		when(petProfileServiceMock.savePetProfile(any(AddPetDTO.class))).thenReturn(dummyPet);
		Assertions.assertThrows(IllegalStateException.class,()->{ petProfileController.createPetprofile(paramList, multiPartFile);});
	}
	
	@Test
	public void getPetprofileIdTest() throws Exception {
		PetprofileModel dummyPetprofileModel = new PetprofileModel();
		dummyPetprofileModel.setImageUrl("img");
//		dummyPetprofileModel.setBio("dummyBio");
		UUID dummyUUID = new UUID(Constants.EXPECTED_INT,Constants.UNEXPECTED_INT);
		when(petProfileServiceMock.getPetprofileById(any(UUID.class))).thenReturn(dummyPetprofileModel);
		Assert.assertEquals(Constants.expectedStatusCode, petProfileController.getPetprofileId(dummyUUID).getStatusCode().value());
	}
	
    @Test
	public void updatePetprofileTest() {
		PetprofileModel dummyPetprofileModel = new PetprofileModel();
		Map<String, String> paramList = new HashMap<String,String>();
		paramList.put("medicalRecordId", "recordId");
		paramList.put("vetVisitDate", "visitDate");
		paramList.put("symptoms", "symptoms");
		paramList.put("vetName", "vetname");
		paramList.put("vaccinationDate", "17-10-1997");
		paramList.put("surgery", "surgery");
		paramList.put("medication", "medication");
		
		byte[] b = new byte[20];
		new Random().nextBytes(b);		
		MultipartFile multiPartFile = new MockMultipartFile("mock", b);
//		dummyPetprofileModel.setBio("dummyBio");
		when(petProfileServiceMock.updatePetprofile(any(AddPetDTO.class))).thenReturn(dummyPetprofileModel);
		Assertions.assertThrows(IllegalStateException.class,()->{ petProfileController.updatePetprofile(paramList, multiPartFile);});
	}
	
	@Test
	public void deletePetprofileByIdTest() {
		UUID dummyUUID = new UUID(Constants.EXPECTED_INT,Constants.UNEXPECTED_INT);
		when(petProfileServiceMock.deletePetprofileById(any(UUID.class))).thenReturn("expectedString");
		Assert.assertEquals(Constants.expectedStatusCode, petProfileController.deletePetprofileById(dummyUUID).getStatusCode().value());
	}

}
