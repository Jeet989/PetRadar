package com.Group1.PetRadar.utils;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Random;

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
import org.springframework.util.Assert;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;



@RunWith(MockitoJUnitRunner.class)
@AutoConfigureTestDatabase(replace = Replace.NONE)
@DataJpaTest
class AwsServiceTest {
	
	@InjectMocks
	AwsService awsService;
	
	@Mock
	AmazonS3 amazonS3Mock;


	@Test
	public void convertMultiPartFileTest() {
		byte[] b = new byte[20];
		new Random().nextBytes(b);		
		MultipartFile multiPartFile = new MockMultipartFile("mock", b);
		
		File dummyFile = new File("");
		
		Assertions.assertEquals(dummyFile, awsService.convertMultiPartFileToFile(multiPartFile));
	}
	
	@Test
	public void findByNameTestNegative() {
		S3Object dummyS3Object = new S3Object();
		S3ObjectInputStream dummyObjInputStream = new S3ObjectInputStream(null, null);
		dummyS3Object.setObjectContent(dummyObjInputStream);
		when(amazonS3Mock.getObject(anyString(), anyString())).thenReturn(dummyS3Object);
		Assertions.assertThrows(NullPointerException.class,() -> { awsService.findByName("dd");});
	}
	
	@Test
	public void fetchImageUrlTest() throws MalformedURLException, UnsupportedEncodingException {
		String paramValue = "param\\with\\backslash";
		String yourURLStr = "http://host.com?param=" + java.net.URLEncoder.encode(paramValue, "UTF-8");
		java.net.URL dummyUrl = new java.net.URL(yourURLStr);
		String result = dummyUrl.toString();
		when(amazonS3Mock.getUrl(anyString(), anyString())).thenReturn(dummyUrl);
		Assertions.assertEquals(result, awsService.fetchImageUrl("some", "string"));
		
	}
	
	@Test
	public void fetchImageUrlTestNegative() throws MalformedURLException, UnsupportedEncodingException {
		String paramValue = "param\\with\\backslash";
		String yourURLStr = "http://host.com?param=" + java.net.URLEncoder.encode(paramValue, "UTF-8");
		java.net.URL dummyUrl = new java.net.URL(yourURLStr);
		String result = dummyUrl.toString();
		when(amazonS3Mock.getUrl(anyString(), anyString())).thenThrow(NullPointerException.class);
		Assertions.assertThrows(NullPointerException.class,()->{ awsService.fetchImageUrl("some", "string");});
		
	}
	
	@Test
	public void saveTest() {
		byte[] b = new byte[20];
		new Random().nextBytes(b);		
		MultipartFile multiPartFile = new MockMultipartFile("mock", b);
		
		File dummyFile = new File("");
		Assertions.assertEquals(null, awsService.save(multiPartFile));

	}
	

}
