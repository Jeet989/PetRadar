package com.Group1.PetRadar.Controller;

import static org.junit.Assert.*;
import static org.junit.Assert.assertEquals;

import com.Group1.PetRadar.utils.Constants;
import org.junit.jupiter.api.Assertions;


import org.junit.jupiter.api.Test;
import org.junit.Assert;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyBoolean;


import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import com.Group1.PetRadar.Service.UserService;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import com.Group1.PetRadar.DTO.user.updateUserDTO;
import com.Group1.PetRadar.Model.User;
import com.Group1.PetRadar.DTO.auth.AuthReqDTO;
import org.springframework.web.multipart.MultipartFile;


@RunWith(MockitoJUnitRunner.class)
@AutoConfigureTestDatabase(replace = Replace.NONE)
@DataJpaTest
public class UserControllerTest {

	@InjectMocks
	UserController mockUserController;

	@Mock
	UserService userServiceMock;

	@Test
	public void homeTest() {
		Assert.assertEquals("Never give up!!", mockUserController.home());
	}
	@Test
	public void getUserByIdPositiveTestcase1() {
		Assert.assertEquals(Constants.expectedStatusCode, mockUserController.getUserById("34").getBody().getStatus());
	}
	@Test
	public void getUserByIdNegativeTestcase1() throws Exception {
		when(userServiceMock.findById(anyString())).thenThrow(new Exception());
		Assert.assertEquals(Constants.updatedExpectedValue, mockUserController.getUserById("34").getBody().getStatus());
		
	}

	//Test cases for user  register,login & save

	@Test
	public void googleRegisterLoginNewUserPositive1() throws Exception {
		User dummyUser = new User();
		//returning true assuming its a valid new user
		when(userServiceMock.googleLogin(any(User.class), anyBoolean())).thenReturn(true);
		Assert.assertEquals(Constants.expectedStatusCode, mockUserController.googleRegisterLogin(dummyUser, true).getBody().getStatus());
	}
	
	@Test
	public void googleRegisterLoginRegisterErrorNeg1() throws Exception {
		User dummyUser = new User();
		//throwing an exception assuming an error in googleLogin function
		when(userServiceMock.googleLogin(any(User.class), anyBoolean())).thenThrow(new Exception());
		Assert.assertEquals(Constants.updatedExpectedValue, mockUserController.googleRegisterLogin(dummyUser, true).getBody().getStatus());
	}

	@Test
	public void googleRegisterLoginUnsuccessfulLoginNeg2() throws Exception {
		User dummyUser = new User();
		//returning false assuming its an invalid user
		when(userServiceMock.googleLogin(any(User.class), anyBoolean())).thenReturn(false);
		Assertions.assertThrows(Exception.class, () -> {mockUserController.googleRegisterLogin(dummyUser, true).getBody().getStatus();});
	}

	@Test
	public void saveUserPositiveCase1() throws Exception {
		AuthReqDTO dummyAuthReqDTO = new AuthReqDTO();
		when(userServiceMock.registerAppUser(any(AuthReqDTO.class))).thenReturn(true);
		Assert.assertEquals(Constants.expectedStatusCode, mockUserController.saveUser(dummyAuthReqDTO).getBody().getStatus());
	}


	@Test
	public void saveUserNegativeCase1() throws Exception {
		AuthReqDTO dummyAuthReqDTO = new AuthReqDTO();
		when(userServiceMock.registerAppUser(any(AuthReqDTO.class))).thenReturn(false);
		Assertions.assertThrows(Exception.class,() -> { mockUserController.saveUser(dummyAuthReqDTO).getBody().getStatus();});
	}
	
	@Test
	public void saveUserNegativeCase2() throws Exception {
		AuthReqDTO dummyAuthReqDTO = new AuthReqDTO();
		when(userServiceMock.registerAppUser(any(AuthReqDTO.class))).thenThrow(new Exception());
		Assert.assertEquals(Constants.updatedExpectedValue, mockUserController.saveUser(dummyAuthReqDTO).getBody().getStatus());
	}
	
	@Test
	public void loginPositive1() throws Exception {
		AuthReqDTO dummyAuthReqDTO = new AuthReqDTO();
		when(userServiceMock.appLogin(any(AuthReqDTO.class))).thenReturn(true);
		Assert.assertEquals(Constants.expectedStatusCode, mockUserController.login(dummyAuthReqDTO).getBody().getStatus());
	
	}
	
	@Test
	public void loginNegative1() throws Exception {
		AuthReqDTO dummyAuthReqDTO = new AuthReqDTO();
		when(userServiceMock.appLogin(any(AuthReqDTO.class))).thenReturn(false);
		Assertions.assertThrows(Exception.class,() -> { mockUserController.login(dummyAuthReqDTO).getBody().getStatus();});
	
	}
	
	@Test
	public void loginNegative2() throws Exception {
		AuthReqDTO dummyAuthReqDTO = new AuthReqDTO();
		when(userServiceMock.appLogin(any(AuthReqDTO.class))).thenThrow(new Exception());
		Assert.assertEquals(Constants.updatedExpectedValue, mockUserController.login(dummyAuthReqDTO).getBody().getStatus());
	
	}
	
	//Test cases for updating the user

    @Mock
	MultipartFile multipartFileMock;
	
	@Test
	public void updateTestPositive1() {
//		when(multipartFileMock.getOriginalFilename()).thenReturn("dummyFileName");
		Assert.assertEquals(Constants.expectedStatusCode, mockUserController.update("dummyFirstName", "dummyLastName", "dummyAddress", "dummyCity", "dummyPin", "8870121270", "0f14d0ab-9605-4a62-a9e4-5ed26688389b", multipartFileMock, Constants.DUMMY_LATITUDE, Constants.DUMMY_LATITUDE, "string").getBody().getStatus());
	}
	
	@Test
	public void updateTestNegative1() throws Exception {
//		when(multipartFileMock.getOriginalFilename()).thenReturn("dummyFileName");
//		when(userServiceMock.updateUser(any(updateUserDTO.class), anyString())).thenThrow(new Exception());
		Assert.assertEquals(Constants.expectedStatusCode, mockUserController.update("dummyFirstName", "dummyLastName", "dummyAddress", "dummyCity", "dummyPin", "8870121270", Constants.DUMMY_UUID, multipartFileMock, Constants.DUMMY_LATITUDE, Constants.DUMMY_LATITUDE, "string").getBody().getStatus());
	}

//Test cases for deleting the user by id

@Test
	public void deleteUserByIdPositiveTest1() {
		Assert.assertEquals(Constants.expectedStatusCode, mockUserController.deleteUserById("34").getBody().getStatus());
	}
	
	@Test
	public void deleteUserByIdNegativeTest1() throws Exception {
		when(userServiceMock.deleteUserById(anyString())).thenThrow(new Exception());
		Assert.assertEquals(Constants.updatedExpectedValue, mockUserController.deleteUserById("34").getBody().getStatus());
	}

}
