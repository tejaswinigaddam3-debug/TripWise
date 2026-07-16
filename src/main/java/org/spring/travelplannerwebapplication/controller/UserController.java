package org.spring.travelplannerwebapplication.controller;

import jakarta.validation.Valid;
import org.spring.travelplannerwebapplication.dto.ApiResponse;
import org.spring.travelplannerwebapplication.dto.UserDTO;
import org.spring.travelplannerwebapplication.model.User;
import org.spring.travelplannerwebapplication.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserDTO>> registerUser(@Valid @RequestBody User user) {
        UserDTO userDTO = userService.registerUser(user);
        ApiResponse<UserDTO> response = ApiResponse.success("User registered successfully", userDTO, HttpStatus.CREATED.value());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<UserDTO>> loginUser(@RequestBody LoginRequest loginRequest) {
        UserDTO userDTO = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());
        ApiResponse<UserDTO> response = ApiResponse.success("Login successful", userDTO, HttpStatus.OK.value());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<UserDTO>> addUser(@Valid @RequestBody User user) {
        UserDTO userDTO = userService.saveUser(user);
        ApiResponse<UserDTO> response = ApiResponse.success("User created successfully", userDTO, HttpStatus.CREATED.value());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserDTO>>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        ApiResponse<List<UserDTO>> response = ApiResponse.success("Users retrieved successfully", users, HttpStatus.OK.value());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDTO>> getUserById(@PathVariable Long id) {
        UserDTO user = userService.getUserById(id);
        ApiResponse<UserDTO> response = ApiResponse.success("User retrieved successfully", user, HttpStatus.OK.value());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<ApiResponse<UserDTO>> getUserByEmail(@PathVariable String email) {
        UserDTO user = userService.getUserByEmail(email);
        ApiResponse<UserDTO> response = ApiResponse.success("User retrieved successfully", user, HttpStatus.OK.value());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDTO>> updateUser(@PathVariable Long id, @Valid @RequestBody User user) {
        UserDTO userDTO = userService.updateUser(id, user);
        ApiResponse<UserDTO> response = ApiResponse.success("User updated successfully", userDTO, HttpStatus.OK.value());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        ApiResponse<String> response = ApiResponse.success("User deleted successfully", "User with id " + id + " has been deleted", HttpStatus.OK.value());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Inner class for login request
    public static class LoginRequest {
        private String email;
        private String password;

        public LoginRequest() {
        }

        public LoginRequest(String email, String password) {
            this.email = email;
            this.password = password;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}