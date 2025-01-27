package com.events.events.mappers;

import com.events.events.models.Invitation;
import com.events.events.dto.InvationDto;

public class InvationMapper {
    public static Invitation mapToInvitation(InvationDto invationDto){
        return Invitation.builder()
                .id(invationDto.getId())
                .event(EventMapper.mapToEvent(invationDto.getEventDto(),invationDto.getEventDto().getCity(), null))
                .invitedUser(CustomerMapper.mapToCustomer(invationDto.getCustomerDto()))
                .build();

    }


    public static InvationDto mapToInvitationDto(Invitation invitation){


        return InvationDto.builder()
                .id(invitation.getId())
                .eventDto(EventMapper.mapToEventDto(invitation.getEvent()))
                .customerDto(CustomerMapper.mapToCustomerDto(invitation.getInvitedUser()))
                .build();
    }
}
