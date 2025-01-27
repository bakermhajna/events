package com.events.events.controllers;


import com.events.events.dto.CustomerDto;
import com.events.events.models.responses.Response;
import com.events.events.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/api/v1/users")
public class CustomersController {

    @Autowired
    public CustomerService customerService;

    @GetMapping("/{username}")
    public ResponseEntity<Set<CustomerDto>> searchbyname(@PathVariable String username){
        return ResponseEntity.ok(customerService.findByName(username));
    }
}
