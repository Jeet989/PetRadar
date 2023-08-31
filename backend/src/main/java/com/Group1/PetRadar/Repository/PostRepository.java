package com.Group1.PetRadar.Repository;

import com.Group1.PetRadar.Model.PostModel;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface PostRepository extends CrudRepository<PostModel, UUID> {
    @Query(value = "SELECT\n" +
            "    u.*, us.user_id as USERID\n" +
            "FROM\n" +
            "    post u\n" +
            "LEFT JOIN `user` us ON `us`.`user_id` = `u`.`user_id`\n" +
            "WHERE\n" +
            "    (\n" +
            "        6371 * ACOS(\n" +
            "            COS(RADIANS(?1)) * COS(RADIANS(u.latitude)) * COS(\n" +
            "                RADIANS(u.longitude) - RADIANS(?2)\n" +
            "            ) + SIN(RADIANS(?1)) * SIN(RADIANS(u.latitude))\n" +
            "        )\n" +
            "    ) < 20;\n" +
            ";", nativeQuery = true)
    Collection<PostModel> findPostByLocation(BigDecimal latitude, BigDecimal longitude);
}