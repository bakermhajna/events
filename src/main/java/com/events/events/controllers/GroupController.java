package com.events.events.controllers;


import com.events.events.mappers.EventMapper;
import com.events.events.models.Customer;
import com.events.events.models.Event;
import com.events.events.dto.GroupDataDto;
import com.events.events.models.requests.AddCustomerToGroup;
import com.events.events.models.requests.CrateEventToGroup;
import com.events.events.models.responses.CreateEventToGroupResponse;
import com.events.events.models.responses.CreatedGroupResponse;
import com.events.events.models.responses.GroupDataResponse;
import com.events.events.models.responses.Response;
import com.events.events.services.GroupService;
import com.events.events.utils.ContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/group")
public class GroupController {

    @Autowired
    private GroupService groupService;

    @PostMapping("/creategroup")
    public ResponseEntity<CreatedGroupResponse> createGroup(@RequestBody GroupDataDto groupDataDto){
        Customer currentCustomer = ContextHolder.getCustomerFromContext();
        return ResponseEntity.ok(
                CreatedGroupResponse.builder()
                        .groupID(groupService.createGroup(groupDataDto,currentCustomer).getId())
                        .msg("Group created")
                        .build()
                );
    }

    @PostMapping("/adduser")
    public ResponseEntity<Response> addUser(@RequestBody AddCustomerToGroup addCustomerToGroup){
        groupService.addCustomerToGroup(addCustomerToGroup);
        return ResponseEntity.ok(Response.builder()
                .msg("Customer added")
                .build());
    }

    @PostMapping("/createevent")
    public ResponseEntity<CreateEventToGroupResponse> createEvent(@RequestBody CrateEventToGroup crateEventToGroup){
        Customer currentCustomer = ContextHolder.getCustomerFromContext();
        Event event=groupService.createEventToGroup(crateEventToGroup , currentCustomer);
        return ResponseEntity.ok(CreateEventToGroupResponse.builder()
                .msg("Event added")
                .event(EventMapper.mapToEventDto(event))
                .build());
    }

    @GetMapping("/{groupid}")
    public ResponseEntity<GroupDataResponse> getGroupData(@PathVariable Long groupid){
        GroupDataResponse groupDataResponse=groupService.getGroupData(groupid);
        return ResponseEntity.ok(groupDataResponse);
    }
}
