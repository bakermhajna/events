package com.events.events.models.responses;


import com.events.events.dto.EventDto;
import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class CreateEventToGroupResponse extends Response{

    private EventDto event;
}
