package com.events.events.models.responses;


import lombok.Builder;
import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class CreatedGroupResponse extends Response{

    private Long groupID;

}
