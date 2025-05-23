package com.events.events.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDto {

    private String id;

    private String name;

    private String email;

    private String phoneNumber;
}
