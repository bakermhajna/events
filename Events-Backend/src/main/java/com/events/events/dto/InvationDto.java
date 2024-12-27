package com.events.events.dto;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class InvationDto {

    private Long id;
    private CustomerDto customerDto;
    private EventDto eventDto;
}
