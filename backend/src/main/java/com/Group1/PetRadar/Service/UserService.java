package com.Group1.PetRadar.Service;

import java.util.List;
import java.util.UUID;

import com.Group1.PetRadar.DTO.auth.AuthReqDTO;
import com.Group1.PetRadar.DTO.user.RegisterUserDTO;
import com.Group1.PetRadar.DTO.user.updateUserDTO;
import com.Group1.PetRadar.Model.PetprofileModel;
import com.Group1.PetRadar.Model.PostModel;
import com.Group1.PetRadar.Model.User;

public interface UserService {

	User saveUser(RegisterUserDTO user);

	User saveGoogleUser(User user);

	User saveUser(User user);

	String generateToken(String tokenSubject);

	User updateUser(updateUserDTO userDetails, String userId) throws Exception;

	User getUserEmail(String email);

	User findById(String id) throws Exception;

	Boolean deleteUserById(String id) throws Exception;

	Boolean googleLogin(User user, Boolean isLogin) throws Exception;

	Boolean appLogin(AuthReqDTO authReqDTO) throws Exception;

	Boolean registerAppUser(AuthReqDTO authReqDTO) throws Exception;

	List<PetprofileModel> findPetsByUserId(UUID id) throws Exception;

	List<PostModel> findPostsByUserId(UUID id) throws Exception;
}
