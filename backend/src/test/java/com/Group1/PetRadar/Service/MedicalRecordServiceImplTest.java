package com.Group1.PetRadar.Service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Calendar;
import java.util.Date;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.Group1.PetRadar.DTO.medicalRecord.AddPetMedicalRecordDTO;
import com.Group1.PetRadar.Model.MedicalHistory;
import com.Group1.PetRadar.Service.Implementation.MedicalRecordServiceImpl;

@RunWith(MockitoJUnitRunner.class)
@AutoConfigureTestDatabase(replace = Replace.NONE)
@DataJpaTest
class MedicalRecordServiceImplTest {
	
	@InjectMocks
	MedicalRecordServiceImpl impl;
	
	@Test
	public void saveMedicalTest() throws Exception {
		AddPetMedicalRecordDTO dummyHistory = new AddPetMedicalRecordDTO();
		Date dummyDate = new Date();
		
		dummyHistory.setVetVisitDate("Thu Jun 18 20:56:02 EDT 2009");
		dummyHistory.setSymptoms("symptoms");
		dummyHistory.setVetName("vetName");
		dummyHistory.setVaccinationDate("Thu Jun 18 20:56:02 EDT 2009");
		dummyHistory.setSurgery("srugery");
		dummyHistory.setMedication("medication");
		
		Assertions.assertThrows(Exception.class,()->{impl.saveMedical(dummyHistory);});
	}

	

}
