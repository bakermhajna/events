package com.events.events.controllers;

import com.events.events.models.Customer;
import com.events.events.dto.EventDto;
import com.events.events.models.responses.Response;
import com.events.events.services.EventService;
import com.events.events.utils.ContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/v1/event")
public class EventController {

    @Autowired
    private EventService eventService;

    @PostMapping("/addevent")
    public ResponseEntity<Response> addEvent(@RequestBody EventDto eventdto) {
        Customer currentCustomer = ContextHolder.getCustomerFromContext();
        eventService.addEvent(eventdto,currentCustomer);
        return ResponseEntity.ok(Response.builder()
                        .msg("Event Added")
                .build() );
    }

    @GetMapping("/{eventid}")
    public ResponseEntity<EventDto> getEvent(@PathVariable Long eventid){
        Customer currentCustomer = ContextHolder.getCustomerFromContext();
        return ResponseEntity.ok(eventService.getEventByIdForCustomer(eventid,currentCustomer));
    }

    @GetMapping("/city/{cityid}")
    public ResponseEntity<Set<EventDto>> getEventsByCity(@PathVariable Long cityid){
        Customer currentCustomer = ContextHolder.getCustomerFromContext();
        return ResponseEntity.ok(eventService.getEventsByCity(cityid));
    }
}
