package com.events.events.models.auth;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class registerDetails {

    private String Email;
    private String password;
    private String name;
    private String phoneNumber;

}

