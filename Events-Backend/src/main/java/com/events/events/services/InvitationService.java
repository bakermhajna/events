package com.events.events.services;


import com.events.events.mappers.CustomerMapper;
import com.events.events.mappers.InvationMapper;
import com.events.events.models.Customer;
import com.events.events.models.Event;
import com.events.events.models.Invitation;
import com.events.events.dto.CustomerDto;
import com.events.events.dto.InvationDto;
import com.events.events.repositories.InvitationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class InvitationService {

    @Autowired
    private InvitationRepository invitationRepository;

    @Autowired
    private EventService eventService;

    @Autowired
    private CustomerService customerService;

    public Set<CustomerDto> invite(Set<String> invitedCustomers, Long eventId) {
    Event event=eventService.getEvent(eventId);
    Set<CustomerDto> invitations= new HashSet<>();
    invitedCustomers.forEach(customerId->{
        Customer fitchedCustomer=customerService.findById(customerId);
         Invitation saved=invitationRepository.save(Invitation.builder()
                         .invitedUser(fitchedCustomer)
                         .event(event)
                 .build());

         invitations.add(CustomerMapper.mapToCustomerDto(saved.getInvitedUser()));
        });
    return invitations;
    }

    public Set<InvationDto> getInvations(String id) {
        Set<Invitation> invitations = invitationRepository.findByInvitedUser_Id(id).get();
        return invitations.stream()
                .map(InvationMapper::mapToInvitationDto).collect(Collectors.toSet());

    }
}
