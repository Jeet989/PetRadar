package com.Group1.PetRadar.Controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.web.multipart.MultipartFile;

import com.Group1.PetRadar.DTO.post.AddPostDTO;
import com.Group1.PetRadar.DTO.user.updateUserDTO;
import com.Group1.PetRadar.Model.PostModel;
import com.Group1.PetRadar.Service.PostService;
import com.Group1.PetRadar.protocol.Response;
import com.Group1.PetRadar.utils.Constants;
import com.Group1.PetRadar.Controller.*;
import com.Group1.PetRadar.Service.*;
import static org.junit.Assert.assertEquals;

@RunWith(MockitoJUnitRunner.class)
@AutoConfigureTestDatabase(replace = Replace.NONE)
@DataJpaTest
class PostControllerTest {

	@InjectMocks
	PostController postController;

	@Mock
	PostService postServiceMock;

	@Test
	public void createPostTest() throws Exception {
		AddPostDTO dummyAddPostDto = new AddPostDTO();
		PostModel dummyPostModel = new PostModel();
		
		Map<String, Object> paramList = new HashMap<String,Object>();
		paramList.put("description", "recordId");
		paramList.put("postDate", "visitDate");
		paramList.put("userId", "symptoms");
		paramList.put("latitude", "vetname");
		paramList.put("longitude", "17-10-1997");
		paramList.put("userName", "surgery");
		paramList.put("userProfilePicture", "medication");
		
		Map<String, String> paramListString = new HashMap<String,String>();
		paramList.put("description", "recordId");
		paramList.put("postDate", "visitDate");
		paramList.put("userId", "symptoms");
		paramList.put("latitude", "vetname");
		paramList.put("longitude", "17-10-1997");
		paramList.put("userName", "surgery");
		paramList.put("userProfilePicture", "medication");
		
		
		byte[] b = new byte[20];
		new Random().nextBytes(b);		
		MultipartFile multiPartFile = new MockMultipartFile("mock", b);
		
		dummyPostModel.setDescription("notNullDesc");
		Response response = new Response();
        response.setMessage(HttpStatus.ACCEPTED.name());
        response.setStatus(HttpStatus.ACCEPTED.value());
        response.setData(dummyAddPostDto);
		when(postServiceMock.savePost(any(AddPostDTO.class))).thenReturn(paramList);
		Assert.assertEquals(response.getStatus(), postController.createPost(paramListString,multiPartFile).getStatusCode().value());
	}
	
//	@Test
//	public void getPostByIdTest() {
//		PostModel dummyPostModel = new PostModel();
//		UUID dummyUUID = new UUID(2l, 3l);
//		
//		dummyPostModel.setDescription("notNulDesc");
//		when(postServiceMock.getPostById(any(UUID.class))).thenReturn(dummyPostModel);
//		Assert.assertEquals(dummyPostModel, postController.getPostById(dummyUUID));
//	}
	
	@Test
	public void updatePostTest1() throws Exception {
		PostModel dummyPostModel = new PostModel();
		Map<String, String> paramList = new HashMap<String,String>();
		paramList.put("description", "recordId");
		paramList.put("postDate", "visitDate");
		paramList.put("userId", "symptoms");
		paramList.put("latitude", "vetname");
		paramList.put("longitude", "17-10-1997");
		paramList.put("userName", "surgery");
		paramList.put("userProfilePicture", "medication");
		
		byte[] b = new byte[20];
		new Random().nextBytes(b);		
		MultipartFile multiPartFile = new MockMultipartFile("mock", b);
		
		dummyPostModel.setDescription("notNulDesc");
		when(postServiceMock.updatePost(any(),any())).thenReturn(dummyPostModel);
		Assert.assertEquals(Constants.updatedExpectedValue, postController.updatePost(paramList,multiPartFile).getStatusCode().value());
	}

	@Test
	public void deletePostByIdTest() {
		UUID dummyUUID = new UUID(Constants.EXPECTED_INT, Constants.UNEXPECTED_INT);
		when(postServiceMock.deletePostById(any(UUID.class))).thenReturn("deleteString");
		Assert.assertEquals(Constants.expectedStatusCode, postController.deletePostById(dummyUUID).getStatusCode().value());
	}

}
