package com.events.events.controllers;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/test")
@CrossOrigin
public class testController {

    @GetMapping("/t")
    public String test(){
        return "{\"text\":\"hi\"}";
    }
}
