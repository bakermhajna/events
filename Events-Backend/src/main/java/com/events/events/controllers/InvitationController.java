package com.events.events.controllers;


import com.events.events.models.Customer;
import com.events.events.dto.CustomerDto;
import com.events.events.dto.InvationDto;
import com.events.events.models.requests.InvitationRequest;
import com.events.events.models.responses.InvationResponse;
import com.events.events.services.InvitationService;
import com.events.events.utils.ContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/v1/invitation")
public class InvitationController {

    @Autowired
    private InvitationService invitationService;


    @PostMapping("/invite")
    public ResponseEntity<InvationResponse> inviteCustomers(@RequestBody InvitationRequest invitationRequest){
        Set<CustomerDto> invitationSet=invitationService.invite(invitationRequest.getInvitedCustomers(),invitationRequest.getEventId());
        return ResponseEntity.ok(InvationResponse.builder()
                        .invationSet(invitationSet)
                        .msg("")
                        .build());
    }

    @GetMapping("")
    public ResponseEntity<Set<InvationDto>> getinvations(){
        Customer currentCustomer =ContextHolder.getCustomerFromContext();
        Set<InvationDto> invationDtos=invitationService.getInvations(currentCustomer.getId());
        return ResponseEntity.ok(invationDtos);
    }

    @GetMapping("event/{eventid}")
    public ResponseEntity<Set<InvationDto>> getinvationbyevent(@PathVariable Long eventid){
        Customer currentCustomer =ContextHolder.getCustomerFromContext();
        Set<InvationDto> invationDtos=invitationService.getInvitedCustomersByEvent(eventid);
        return ResponseEntity.ok(invationDtos);
    }
}
