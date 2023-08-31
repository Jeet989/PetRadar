package com.Group1.PetRadar.Controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import com.Group1.PetRadar.utils.Constants;
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

import com.Group1.PetRadar.DTO.medicalRecord.AddPetMedicalRecordDTO;
import com.Group1.PetRadar.Model.MedicalHistory;
import com.Group1.PetRadar.Service.MedicalRecordService;


@RunWith(MockitoJUnitRunner.class)
@AutoConfigureTestDatabase(replace = Replace.NONE)
@DataJpaTest
class MedicalRecordControllerTest {

	@InjectMocks
	MedicalRecordController medicalRecordController;
	
	@Mock
	MedicalRecordService medicalRecordServiceMock;
	
	@Test
	public void getMedicalByIdTest() throws Exception {
		UUID dummyUUID = new UUID(Constants.EXPECTED_INT,Constants.UNEXPECTED_INT);
		MedicalHistory dummyMedicalHistory = new MedicalHistory();
		
		when(medicalRecordServiceMock.getmedicalById(any(UUID.class))).thenReturn(dummyMedicalHistory);
		Assert.assertEquals(Constants.expectedStatusCode, medicalRecordController.getmedicalById(dummyUUID).getStatusCode().value());
	}
	
	@Test
	public void updateMedicalTest() throws Exception {
		MedicalHistory dummyMedicalHistory = new MedicalHistory();
		Map<String, String> paramList = new HashMap<String,String>();
		paramList.put("medicalRecordId", "0f14d0ab-9605-4a62-a9e4-5ed26688389b");
		paramList.put("vetVisitDate", "Thu Jun 18 20:56:02 EDT 2009");
		paramList.put("symptoms", "symptoms");
		paramList.put("vetName", "vetname");
		paramList.put("vaccinationDate", "Thu Jun 18 20:56:02 EDT 2009");
		paramList.put("surgery", "surgery");
		paramList.put("medication", "medication");
		
		when(medicalRecordServiceMock.updateMedical(any(AddPetMedicalRecordDTO.class))).thenReturn(dummyMedicalHistory);
		Assert.assertEquals(Constants.expectedStatusCode,medicalRecordController.updateMedical(paramList).getStatusCode().value());
		
	}
	@Test
	public void saveMedicalTest() throws Exception {
		MedicalHistory dummyMedicalHistory = new MedicalHistory();
		Map<String, String> paramList = new HashMap<String,String>();
		paramList.put("medicalRecordId", "recordId");
		paramList.put("vetVisitDate", "visitDate");
		paramList.put("symptoms", "symptoms");
		paramList.put("vetName", "vetname");
		paramList.put("vaccinationDate", "17-10-1997");
		paramList.put("surgery", "surgery");
		paramList.put("medication", "medication");

		AddPetMedicalRecordDTO dummyAddPetMedicalRecordDTO = new AddPetMedicalRecordDTO();
		when(medicalRecordServiceMock.saveMedical(any(AddPetMedicalRecordDTO.class))).thenReturn(dummyMedicalHistory);
		
		Assertions.assertThrows(IllegalArgumentException.class,()->{medicalRecordController.saveMedical(paramList);});
	}

	@Test
	public void deleteMedicalById() {
		UUID dummyUUID = new UUID(2l,3l);
		when(medicalRecordServiceMock.deleteMedicalById(any(UUID.class))).thenReturn("expectedString");

		Assert.assertEquals(Constants.expectedStatusCode, medicalRecordController.deleteMedicalById(dummyUUID).getStatusCode().value());
	}
	

}

