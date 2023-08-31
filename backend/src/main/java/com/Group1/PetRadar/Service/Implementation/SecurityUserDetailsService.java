package com.Group1.PetRadar.Service.Implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.Group1.PetRadar.Model.SecurityUser;
import com.Group1.PetRadar.Repository.UserRepository;


@Service
public class SecurityUserDetailsService implements UserDetailsService  {

    @Autowired
    UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        SecurityUser user = userRepository.findByEmail(email).map(SecurityUser::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not present"));
        return user;
    }
}
