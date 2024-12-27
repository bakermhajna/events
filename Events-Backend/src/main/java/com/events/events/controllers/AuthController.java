package com.events.events.controllers;


import com.events.events.models.auth.LoginDetails;
import com.events.events.models.auth.registerDetails;
import com.events.events.models.responses.AuthenticationResponse;
import com.events.events.models.responses.RegistrationResponse;
import com.events.events.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<RegistrationResponse> register(@RequestBody registerDetails registerDetails) {
        return ResponseEntity.ok(authService.register(registerDetails));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginDetails loginDetails) {
        return ResponseEntity.ok(authService.authenticate(loginDetails));
    }

}
