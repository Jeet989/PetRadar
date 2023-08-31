package com.Group1.PetRadar.Repository;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.Group1.PetRadar.Model.User;

public interface UserRepository extends CrudRepository<User, UUID> {
    Optional<User> findByEmail(String username);

    @Query(value = "SELECT * FROM user u WHERE (6371 * acos(cos(radians(?1)) * cos(radians(u.latitude)) * cos(radians(u.longitude) - radians(?2)) + sin(radians(?1)) * sin(radians(u.latitude)))) < 20", nativeQuery = true)
    Collection<User> findUserByLocation(BigDecimal bigDecimal, BigDecimal bigDecimal2);

}
