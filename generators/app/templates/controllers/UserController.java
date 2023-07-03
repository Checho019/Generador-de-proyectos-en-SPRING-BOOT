package com.example.demo.controllers;

import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RequestMapping("/user")
@RestController
public class UserController {

    private final UserRepository userRepository;
    UserController (UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @GetMapping("findall")
    public ResponseEntity<List<User>> getUsers(){
        return ResponseEntity.ok(userRepository.findAll());
    }

    @GetMapping("findone/{id}")
    public ResponseEntity<User> getUser(@PathVariable long id){
        User user = userRepository.findById(id).orElse(null);
        if (user == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    @PostMapping("add")
    public ResponseEntity<User> addUser(@RequestBody User user){
        if (userRepository.existsById(user.getUserId())) {
            return ResponseEntity.badRequest().build();
        }
        userRepository.save(user);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("findone/{id}")
                .buildAndExpand(user.getUserId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable long id){
        if (!userRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("update/{id}")
    public ResponseEntity<User>  updateUser (@PathVariable long id, @RequestBody User user){
        if (!userRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        user.setUserId(id);
        userRepository.save(user);
        return ResponseEntity.ok(user);
    }
}
