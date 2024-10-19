package com.events.events.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Set;


@Data
@Builder
public class GroupDataDto {

    private Long id;

    private String name;

    private CustomerDto admin;

    private Set<CustomerDto> users;

}
