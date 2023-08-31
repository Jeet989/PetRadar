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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.Group1.PetRadar.DTO.post.AddPostDTO;
import com.Group1.PetRadar.DTO.post.UdpatePostDTO;
import com.Group1.PetRadar.Model.PostModel;
import com.Group1.PetRadar.Service.PostService;
import com.Group1.PetRadar.protocol.Response;

@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    PostService postService;

    @PostMapping("/create")
    public ResponseEntity<Response> createPost(
            @RequestParam() Map<String, String> paramList,
            @RequestParam(name = "image", required = true) MultipartFile file) throws Exception {
        Map<String, Object> newPost = new HashMap<>();
        Response failureResponse = null;
        try {
            AddPostDTO newPostDTO = buildAddPostDTO(paramList, file);

            newPost = postService.savePost(newPostDTO);
        } catch (Exception e) {
            failureResponse = new Response(e.getMessage(), HttpStatus.UNAUTHORIZED.value(),
                    HttpStatus.UNAUTHORIZED.name());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(failureResponse);
        }
        Response response = new Response();
        response.setData(newPost);
        response.setMessage(HttpStatus.ACCEPTED.name());
        response.setStatus(HttpStatus.ACCEPTED.value());
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
    }

    private AddPostDTO buildAddPostDTO(Map<String, String> paramList, MultipartFile file) {
        AddPostDTO newPostDTO = new AddPostDTO();
        paramList.forEach((String key, String value) -> {
            switch (key) {
                case "description" -> newPostDTO.setDescription(value);
                case "postDate" -> newPostDTO.setPostDate(value);
                case "userId" -> newPostDTO.setUserId(value);
                case "latitude" -> newPostDTO.setLatitude(new BigDecimal(value));
                case "longitude" -> newPostDTO.setLongitude(new BigDecimal(value));
                case "userName" -> newPostDTO.setUserName(value);
                case "userProfilePicture" -> newPostDTO.setUserProfilePicture(value);
                default -> throw new IllegalStateException("Unexpected value: " + key);
            }
        });
        newPostDTO.setImage(file);
        return newPostDTO;
    }

    @GetMapping("/{latitude}/{longitude}")
    public ResponseEntity<Response> getPostByLocation(
            @PathVariable("latitude") BigDecimal latitude,
            @PathVariable("longitude") BigDecimal longitude) {
        List<PostModel> post = null;
        Response failureResponse = null;

        try {
            post = postService.getNearByPostsBasedOnLocation(latitude, longitude);
        } catch (Exception e) {
            failureResponse = new Response(e.getMessage(), HttpStatus.UNAUTHORIZED.value(),
                    HttpStatus.UNAUTHORIZED.name());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(failureResponse);
        }
        Response response = new Response();
        Map<String, Object> data = new HashMap<>();
        data.put("posts", post);
        response.setData(data);
        response.setMessage(HttpStatus.ACCEPTED.name());
        response.setStatus(HttpStatus.ACCEPTED.value());
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
    }

    @PutMapping("/update")
    public ResponseEntity<Response> updatePost(
            @RequestParam() Map<String, String> paramList,
            @RequestParam(name = "image", required = false) MultipartFile file) throws Exception {
        Response failureResponse = null;
        PostModel updatePost = null;

        try {
            UdpatePostDTO updatePostDTO = new UdpatePostDTO();
            paramList.forEach((String key, String value) -> {
                switch (key) {
                    case "description":
                        updatePostDTO.setDescription(value);
                        break;
                    case "postDate":
                        updatePostDTO.setPostDate(value);
                        break;
                    case "postId":
                        updatePostDTO.setId(value);
                        break;
                    default:
                        throw new IllegalStateException("Unexpected value: " + key);
                }
            });
            if (file != null) {
                updatePostDTO.setImage(file);
            }

            updatePost = postService.updatePost(updatePostDTO, updatePostDTO.getId());

        } catch (Exception e) {
            failureResponse = new Response(e.getMessage(), HttpStatus.UNAUTHORIZED.value(),
                    HttpStatus.UNAUTHORIZED.name());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(failureResponse);
        }

        Response response = new Response();
        Map<String, Object> data = new HashMap<>();
        data.put("post", updatePost);
        response.setData(data);
        response.setMessage(HttpStatus.ACCEPTED.name());
        response.setStatus(HttpStatus.ACCEPTED.value());
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Response> deletePostById(@PathVariable("id") UUID id) {
        Response failureResponse = null;

        try {
            postService.deletePostById(id);
            Response response = new Response();
            Map<String, Object> data = new HashMap<>();
            data.put("message", "Post deleted succesfully");
            response.setData(data);
            response.setMessage(HttpStatus.ACCEPTED.name());
            response.setStatus(HttpStatus.ACCEPTED.value());
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
        } catch (Exception e) {
            failureResponse = new Response(e.getMessage(), HttpStatus.UNAUTHORIZED.value(),
                    HttpStatus.UNAUTHORIZED.name());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(failureResponse);
        }
    }

}
