package com.events.events.models.responses;

import com.events.events.dto.CustomerDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse extends Response {

    private String token;
    private CustomerDto customer;
}
