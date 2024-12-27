package com.events.events.models.requests;


import com.events.events.dto.EventDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CrateEventToGroup {

    private Long GroupId;

    private EventDto event;

}
