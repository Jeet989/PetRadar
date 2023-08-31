package com.Group1.PetRadar.Integration;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.UUID;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.Group1.PetRadar.Service.UserService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.minidev.json.JSONObject;

@RunWith(SpringRunner.class)
@SpringBootTest
public class userIntegrationTest {

    @Mock
    UserService userServiceMock;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private WebApplicationContext webApplicationContext;
    private MockMvc mockMvc;
    private String userId = null;;

    @Test
    public void createUserTest() throws Exception {

        JSONObject obj = new JSONObject();
        String dummyEmail = UUID.randomUUID().toString();
        obj.put("email", dummyEmail+"@example.com");
        obj.put("password", "password");

        MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();

        MvcResult mvcResult = mockMvc.perform(post("/user/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(obj.toString()))
                .andDo(print())
                .andExpect(status().isAccepted()).andReturn();
        String content = mvcResult.getResponse().getContentAsString();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode responseJson = objectMapper.readTree(content);
        userId = responseJson.get("data").get("user").get("userId").toString();
        if (mvcResult.getResponse().getStatus() == 200) {
            Assert.assertTrue(mvcResult.getResponse().getStatus() == 200);
        }
    }

    @Test
    public void loginUserTest() throws Exception {

        JSONObject obj = new JSONObject();
        obj.put("email", "testhh1sddfs23ddsdsd4s2wqw@example.com");
        obj.put("password", "password");

        MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();

        MvcResult mvcResult = mockMvc.perform(post("/user/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(obj.toString()))
                .andDo(print())
                .andExpect(status().isAccepted()).andReturn();
        String content = mvcResult.getResponse().getContentAsString();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode responseJson = objectMapper.readTree(content);
        if (mvcResult.getResponse().getStatus() == 200) {
            Assert.assertTrue(mvcResult.getResponse().getStatus() == 200);
        }
    }

}