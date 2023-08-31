package com.Group1.PetRadar.Controller;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.Group1.PetRadar.DTO.auth.AuthReqDTO;
import com.Group1.PetRadar.DTO.user.updateUserDTO;
import com.Group1.PetRadar.Model.PetprofileModel;
import com.Group1.PetRadar.Model.PostModel;
import com.Group1.PetRadar.Model.User;
import com.Group1.PetRadar.Service.UserService;
import com.Group1.PetRadar.protocol.Response;

@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	UserService userService;

	// For Testing only
	@GetMapping("/message")
	public String home() {
		return "Never give up!!";
	}

	@GetMapping("/allPet")
	public ResponseEntity<Response> getAllPetsByUserId(@RequestParam(name = "userId") String id) {

		Response failureResponse = null;
		List<PetprofileModel> pets = null;
		try {
			pets = userService.findPetsByUserId(UUID.fromString(id));
		} catch (Exception e) {
			failureResponse = new Response(e.getMessage(), HttpStatus.UNAUTHORIZED.value(),
					HttpStatus.UNAUTHORIZED.name());
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(failureResponse);
		}
		Map<String, Object> data = new HashMap<>();
		data.put("pets", pets);
		Response response = new Response();
		response.setData(data);
		response.setMessage(HttpStatus.ACCEPTED.name());
		response.setStatus(HttpStatus.ACCEPTED.value());
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
	}

	@GetMapping("/allPost")
	public ResponseEntity<Response> getAllPostsByUserId(@RequestParam(name = "userId") String id) {

		Response failureResponse = null;
		List<PostModel> posts = null;
		try {
			posts = userService.findPostsByUserId(UUID.fromString(id));
		} catch (Exception e) {
			failureResponse = new Response(e.getMessage(), HttpStatus.UNAUTHORIZED.value(),
					HttpStatus.UNAUTHORIZED.name());
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(failureResponse);
		}
		Map<String, Object> data = new HashMap<>();
		data.put("posts", posts);
		Response response = new Response();
		response.setData(data);
		response.setMessage(HttpStatus.ACCEPTED.name());
		response.setStatus(HttpStatus.ACCEPTED.value());
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Response> getUserById(@PathVariable String id) {
		Response failureResponse = null;
		User user = null;
		try {
			user = userService.findById(id);
		} catch (Exception e) {
			failureResponse = new Response(e.getMessage(), HttpStatus.UNAUTHORIZED.value(),
					HttpStatus.UNAUTHORIZED.name());
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(failureResponse);
		}
		Map<String, Object> data = new HashMap<>();
		data.put("user", user);
		Response response = new Response();
		response.setData(data);
		response.setMessage(HttpStatus.ACCEPTED.name());
		response.setStatus(HttpStatus.ACCEPTED.value());
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
	}

	@PostMapping("/googleLogin")
	public ResponseEntity<Response> googleRegisterLogin(@RequestBody User user, @RequestParam Boolean isLogin)
			throws Exception {
		Boolean isLoginSuccessful = false;
		Response failureResponse = null;

		try {
			isLoginSuccessful = userService.googleLogin(user, isLogin);
		} catch (Exception e) {
			failureResponse = new Response(e.getMessage(), HttpStatus.UNAUTHORIZED.value(),
					HttpStatus.UNAUTHORIZED.name());
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(failureResponse);
		}

		String token = null;
		Response response = new Response();

		if (isLoginSuccessful) {
			User registeredUser = userService.getUserEmail(user.getEmail());
			token = userService.generateToken(user.getEmail());
			Map<String, Object> data = new HashMap<>();
			data.put("token", token);
			data.put("user", registeredUser);

			response.setData(data);
			response.setMessage(HttpStatus.ACCEPTED.name());
			response.setStatus(HttpStatus.ACCEPTED.value());
		} else
			throw new Exception("Login is not successful");

		return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
	}

	@PostMapping("/register")
	public ResponseEntity<Response> saveUser(@RequestBody AuthReqDTO authReqDTO) throws Exception {

		Boolean saveAppUserSuccessful = false;
		Response failureResponse = null;

		try {
			saveAppUserSuccessful = userService.registerAppUser(authReqDTO);
		} catch (Exception e) {
			failureResponse = new Response(e.getMessage(), HttpStatus.UNAUTHORIZED.value(),
					HttpStatus.UNAUTHORIZED.name());
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(failureResponse);
		}

		String token = null;
		User user = null;
		Response response = new Response();

		if (saveAppUserSuccessful) {
			user = userService.getUserEmail(authReqDTO.getEmail());
			token = userService.generateToken(authReqDTO.getEmail());
			Map<String, Object> data = new HashMap<>();
			data.put("token", token);
			data.put("user", user);

			response.setData(data);
			response.setMessage(HttpStatus.ACCEPTED.name());
			response.setStatus(HttpStatus.ACCEPTED.value());
		} else
			throw new Exception("Registration not successful. Please try again");

		return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);

	}

	@PostMapping("/login")
	public ResponseEntity<Response> login(@RequestBody AuthReqDTO authReqDTO) throws Exception {

		Boolean isAppLoginSuccessful = false;
		Response failureResponse = null;

		try {
			isAppLoginSuccessful = userService.appLogin(authReqDTO);
		} catch (Exception e) {
			failureResponse = new Response(e.getMessage(), HttpStatus.UNAUTHORIZED.value(),
					HttpStatus.UNAUTHORIZED.name());
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(failureResponse);
		}
		String token = null;
		Response response = new Response();
		if (isAppLoginSuccessful) {
			User user = userService.getUserEmail(authReqDTO.getEmail());
			token = userService.generateToken(authReqDTO.getEmail());
			Map<String, Object> data = new HashMap<>();
			data.put("token", token);
			data.put("user", user);

			response.setData(data);
			response.setMessage(HttpStatus.ACCEPTED.name());
			response.setStatus(HttpStatus.ACCEPTED.value());
		} else
			throw new Exception("Login is not successful. Please try again!");

		return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
	}

	@PutMapping("/update")
	public ResponseEntity<Response> update(
			@RequestParam("firstName") String firstName,
			@RequestParam("lastName") String lastName,
			@RequestParam("address") String address,
			@RequestParam("city") String city,
			@RequestParam("pincode") String pincode,
			@RequestParam("mobileNumber") String mobileNumber,
			@RequestParam("userId") String userId,
			@RequestParam(name = "image", required = false) MultipartFile file,
			@RequestParam("latitude") String latitude,
			@RequestParam("longitude") String longitude,
			@RequestParam("oneSignalUserId") String oneSignalUserId) {

		updateUserDTO updatedUserDetails = new updateUserDTO();
		updatedUserDetails.setFirstName(firstName);
		updatedUserDetails.setLastName(lastName);
		updatedUserDetails.setAddress(address);
		updatedUserDetails.setCity(city);
		updatedUserDetails.setPincode(pincode);
		updatedUserDetails.setFile(file);
		updatedUserDetails.setPhoneNumber(Long.parseLong(mobileNumber));
		updatedUserDetails.setLatitude(new BigDecimal(latitude));
		updatedUserDetails.setLongitude(new BigDecimal(longitude));
		updatedUserDetails.setOneSignalUserId(oneSignalUserId);

		Response failureResponse = null;
		User user = null;
		String token = null;
		try {
			user = userService.updateUser(updatedUserDetails, userId);
			token = userService.generateToken(userId);
		} catch (Exception e) {
			failureResponse = new Response(e.getMessage(), HttpStatus.UNAUTHORIZED.value(),
					HttpStatus.UNAUTHORIZED.name());
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(failureResponse);
		}
		Response response = new Response();
		Map<String, Object> data = new HashMap<>();
		data.put("token", token);
		data.put("user", user);
		response.setData(data);
		response.setMessage(HttpStatus.ACCEPTED.name());
		response.setStatus(HttpStatus.ACCEPTED.value());
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Response> deleteUserById(@PathVariable String id) {
		try {
			Response failureResponse = null;
			User user = null;
			try {
				userService.deleteUserById(id);
			} catch (Exception e) {
				failureResponse = new Response(e.getMessage(), HttpStatus.UNAUTHORIZED.value(),
						HttpStatus.UNAUTHORIZED.name());
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(failureResponse);
			}
			Response response = new Response();
			response.setData("User delete succesfully");
			response.setMessage(HttpStatus.ACCEPTED.name());
			response.setStatus(HttpStatus.ACCEPTED.value());
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
	}
}
