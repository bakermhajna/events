package com.events.events.services;


import com.events.events.exception.UserExistsException;
import com.events.events.models.Customer;
import com.events.events.models.auth.LoginDetails;
import com.events.events.models.auth.registerDetails;
import com.events.events.models.responses.AuthenticationResponse;
import com.events.events.models.responses.RegistrationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.AuthenticationManager;

import static com.events.events.utils.IdGenerator.generateId;

@Service
public class AuthService {

    @Autowired
    private JwtService jwtService;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private  AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;
    //        passwordEncoder.encode(request.password())
    public AuthenticationResponse authenticate(LoginDetails request){

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        Customer user = customerService.findByEmail(request.getEmail()).orElseThrow();
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .msg("authenticated")
                .build();
    }

    public RegistrationResponse register(registerDetails request){
        customerService.findByEmail(request.getEmail()).ifPresentOrElse(user -> {
            throw new UserExistsException(request.getEmail());
        }, () -> {
        });

        Customer user = Customer.builder()
                .id(generateId())
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phoneNumber(request.getPhoneNumber())
                .build();
        customerService.saveCustomer(user);
        return RegistrationResponse.builder()
                .msg("User registered")
                .build();
    }
}
