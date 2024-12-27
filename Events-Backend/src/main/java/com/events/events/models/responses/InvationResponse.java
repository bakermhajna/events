package com.events.events.models.responses;


import com.events.events.dto.CustomerDto;
import lombok.Data;
import lombok.experimental.SuperBuilder;

import java.util.Set;

@Data
@SuperBuilder
public class InvationResponse extends Response{
    private Set<CustomerDto> invationSet;
}
