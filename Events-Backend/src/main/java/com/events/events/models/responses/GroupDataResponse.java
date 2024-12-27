package com.events.events.models.responses;

import com.events.events.dto.EventDto;
import com.events.events.dto.GroupDataDto;
import lombok.Data;
import lombok.experimental.SuperBuilder;

import java.util.Set;

@Data
@SuperBuilder
public class GroupDataResponse extends Response{

    GroupDataDto groupData;
    Set<EventDto> events;
}
