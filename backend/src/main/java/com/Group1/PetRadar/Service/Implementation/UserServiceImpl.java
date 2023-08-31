package com.Group1.PetRadar.Service.Implementation;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import com.Group1.PetRadar.DTO.auth.AuthReqDTO;
import com.Group1.PetRadar.DTO.user.RegisterUserDTO;
import com.Group1.PetRadar.DTO.user.updateUserDTO;
import com.Group1.PetRadar.Model.PetprofileModel;
import com.Group1.PetRadar.Model.PostModel;
import com.Group1.PetRadar.Model.User;
import com.Group1.PetRadar.Repository.UserRepository;
import com.Group1.PetRadar.Service.UserService;
import com.Group1.PetRadar.utils.AwsService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtEncoder jwtEncoder;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AwsService awsService;

    @Override
    public User saveUser(RegisterUserDTO registerUserDTO) {
        User newUser = new User();
        newUser.setEmail(registerUserDTO.getEmail());
        newUser.setPassword(passwordEncoder.encode(registerUserDTO.getPassword()));
        newUser.setFirstName(registerUserDTO.getFirstname());
        newUser.setLastName(registerUserDTO.getLastname());
        newUser.setProfileUrl(registerUserDTO.getProfileurl());
        return userRepository.save(newUser);
    }

    @Override
    public User saveGoogleUser(User user) {
        User UserEncode = new User();
        UserEncode.setEmail(user.getEmail());
        UserEncode.setPassword(null);
        UserEncode.setFirstName(user.getFirstName());
        UserEncode.setLastName(user.getFirstName());
        UserEncode.setProfileUrl(user.getProfileUrl());
        return userRepository.save(UserEncode);
    }

    @Override
    public User saveUser(User user) {
        User UserEncode = new User();
        UserEncode.setEmail(user.getEmail());
        UserEncode.setPassword(passwordEncoder.encode(user.getPassword()));
        UserEncode.setFirstName(user.getFirstName());
        UserEncode.setLastName(user.getFirstName());
        UserEncode.setProfileUrl(user.getProfileUrl());
        return userRepository.save(UserEncode);
    }

    @Override
    public String generateToken(String tokenSubject) {
        Instant now = Instant.now();
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("PetRadar")
                .issuedAt(now)
                .expiresAt(now.plus(1, ChronoUnit.HOURS))
                .subject(tokenSubject)
                .build();
        JwsHeader jwsHeader = JwsHeader.with(() -> "HS256").build();
        return this.jwtEncoder.encode(JwtEncoderParameters.from(jwsHeader, claims)).getTokenValue();
    }

    @Override
    public User getUserEmail(String email) {
        return userRepository.findByEmail(email).get();
    }

    public User updateUser(updateUserDTO userDetails, String userId) throws Exception {
        try {
            User user = userRepository.findById(UUID.fromString(userId)).get();
            user.setFirstName(userDetails.getFirstName());
            user.setLastName(userDetails.getLastName());
            user.setAddress(userDetails.getAddress());
            user.setCity(userDetails.getCity());
            user.setPincode(userDetails.getPincode());
            user.setPhoneNumber(userDetails.getPhoneNumber());
            user.setImageUrl(awsService.save(userDetails.getFile()));
            user.setLatitude(userDetails.getLatitude());
            user.setLongitude(userDetails.getLongitude());
            user.setOnesignalUserId(userDetails.getOneSignalUserId());
            userRepository.save(user);
            return user;
        } catch (Exception e) {
            throw new Exception("Please enter valid data");
        }

    }

    @Override
    public Boolean googleLogin(User user, Boolean isLogin) throws Exception {
        Boolean isUserFound = false;
        Boolean isGoogleUser = false;
        Boolean isGoogleLoginFlow = isLogin;

        // check if user is in the db
        String ifUserExistsQuery = "select * from user where email = :email";
        MapSqlParameterSource map = new MapSqlParameterSource();
        map.addValue("email", user.getEmail());
        User foundUser = new User();
        try {
            foundUser = (User) namedParameterJdbcTemplate.queryForObject(ifUserExistsQuery, map,
                    new BeanPropertyRowMapper(User.class));
        } catch (EmptyResultDataAccessException e) {
            isUserFound = false;
        }
        if (foundUser.getEmail() != null)
            isUserFound = true;

        if (!isUserFound && isLogin){
            //chnaged for long sattement implementation
            String exception_msg="You have not registered through google yet, Please sign up first and try again";
            throw new Exception(exception_msg);
        }
        if (foundUser.getEmail() != null && foundUser.getPassword() == null)
            isGoogleUser = true;
        if (!isUserFound && !isGoogleLoginFlow) {
            user.setPassword(null);
            saveGoogleUser(user);
            return true;
        } else if (isUserFound && isGoogleUser(isGoogleUser, isGoogleLoginFlow)) {
            throw new Exception("You have already signed up as a google User");
        } else {
            if (isGoogleUser) // if user has the password as dummy return token
                return true;
            else // else if user doesnt have the password as dummy, return exception stating that
                 // the user should login through app
                throw new Exception("Please login through app as you have already registered as a google user");
        }

    }
    //refactoring for complex conditional
    public boolean isGoogleUser(boolean isGoogleUser, boolean isGoogleLoginFlow)
    {
        return (isGoogleUser && !isGoogleLoginFlow);
    }

    @Override
    public Boolean appLogin(AuthReqDTO authReqDTO) throws Exception {

        Boolean isUserFound = false;
        Boolean isGoogleUser = false;

        String ifUserExistsQuery = "select * from user where email = :email";
        MapSqlParameterSource map = new MapSqlParameterSource();
        map.addValue("email", authReqDTO.getEmail());
        User foundUser = new User();
        try {
            foundUser = (User) namedParameterJdbcTemplate.queryForObject(ifUserExistsQuery, map,
                    new BeanPropertyRowMapper(User.class));
        } catch (EmptyResultDataAccessException e) {
            isUserFound = false;
            throw new Exception("You have not signed up yet in our database. please sign up first");
        }

        if (foundUser.getEmail() != null && foundUser.getEmail().toString().length() > 0)
            isUserFound = true;

        if (foundUser.getPassword() == null)
            isGoogleUser = true;

        if (isGoogleUser) {
            throw new Exception("Please login through google as you have already registered through app");
        } else {
            if (passwordEncoder.matches(authReqDTO.getPassword(), foundUser.getPassword()))
                return true;
            else
                throw new Exception("Incorrect Password. Please try again");
        }

    }

    @Override
    public Boolean registerAppUser(AuthReqDTO authReqDTO) throws Exception {

        Boolean isGoogleUser = false;
        Boolean isUserFound = false;

        String ifUserExistsQuery = "select * from user where email = :email";
        MapSqlParameterSource map = new MapSqlParameterSource();
        map.addValue("email", authReqDTO.getEmail());
        User foundUser = new User();
        try {
            foundUser = (User) namedParameterJdbcTemplate.queryForObject(ifUserExistsQuery, map,
                    new BeanPropertyRowMapper(User.class));
        } catch (EmptyResultDataAccessException e) {
            isUserFound = false;
        }

        if (foundUser.getEmail() != null)
            isUserFound = true;

        if (foundUser.getProfileUrl() != null)
            isGoogleUser = true;

        if (isGoogleUser)
            throw new Exception("You have registered already as a google user, please login through google");

        if (isUserFound == true && isGoogleUser == false){
            String existingUser="You have registered already in our application. Please proceed to login";
            throw new Exception(existingUser);
        }
        User newUser = new User();
        newUser.setEmail(authReqDTO.getEmail());
        newUser.setPassword(authReqDTO.getPassword());

        if (!isUserFound) {
            saveUser(newUser);
            return true;
        } else {
            return false;
        }

    }

    public User findById(String id) throws Exception {
        try {
            User user = null;
            if (!userRepository.existsById(UUID.fromString(id))) {
                throw new Exception("User not found");
            }
            user = userRepository.findById(UUID.fromString(id)).get();
            return user;
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Unable to fetch the user Details");
        }
    }

    public Boolean deleteUserById(String id) throws Exception {
        try {
            userRepository.deleteById(UUID.fromString(id));
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Unable to Delete the user");
        }
    }

    public List<PetprofileModel> findPetsByUserId(UUID userId) throws Exception {
        try {
            User user = findById(userId.toString());
            return user.getPets();
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Exception occurred while retrieving pets");
        }
    }

    public List<PostModel> findPostsByUserId(UUID userId) throws Exception {
        try {
            User user = findById(userId.toString());
            System.out.println(user.getEmail());

            return user.getPosts();
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Exception occurred while retrieving pets");
        }
    }

}
