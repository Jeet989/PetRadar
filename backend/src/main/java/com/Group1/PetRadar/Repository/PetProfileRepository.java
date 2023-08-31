package com.Group1.PetRadar.Repository;

import com.Group1.PetRadar.Model.PetprofileModel;

import java.util.UUID;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface PetProfileRepository extends CrudRepository<PetprofileModel, UUID> {
    Optional<PetprofileModel> findByUserUserId(UUID userId);
}

