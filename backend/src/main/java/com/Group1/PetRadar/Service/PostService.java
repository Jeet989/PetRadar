package com.Group1.PetRadar.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.Group1.PetRadar.DTO.post.AddPostDTO;
import com.Group1.PetRadar.DTO.post.UdpatePostDTO;
import com.Group1.PetRadar.Model.PostModel;

public interface PostService {

    Map<String, Object> savePost(AddPostDTO postmodel) throws Exception;

    List<PostModel> getNearByPostsBasedOnLocation(BigDecimal latitude, BigDecimal longitude);

    PostModel updatePost(UdpatePostDTO postmodel, UUID id);

    String deletePostById(UUID id);
}
