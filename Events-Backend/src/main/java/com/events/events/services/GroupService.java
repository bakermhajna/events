package com.events.events.services;

import com.events.events.exception.GroupNotFoundException;
import com.events.events.mappers.CustomerMapper;
import com.events.events.mappers.EventMapper;
import com.events.events.mappers.GroupDataMapper;
import com.events.events.models.Customer;
import com.events.events.models.Event;
import com.events.events.models.GroupData;
import com.events.events.dto.CustomerDto;
import com.events.events.dto.GroupDataDto;
import com.events.events.models.Media;
import com.events.events.models.requests.AddCustomerToGroup;
import com.events.events.models.requests.CrateEventToGroup;
import com.events.events.models.responses.GroupDataResponse;
import com.events.events.repositories.GroupDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class GroupService {

    @Autowired
    private GroupDataRepository groupDataRepository;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private EventService eventService;

    @Autowired
    private MediaService mediaService;

    public GroupData createGroup(GroupDataDto groupDataDto, Customer currentCustomer){
        CustomerDto admin=CustomerMapper.mapToCustomerDto(currentCustomer);
        groupDataDto.setAdmin(admin); groupDataDto.setUsers(Set.of(admin));
       GroupData savedGroupData= groupDataRepository.save( GroupDataMapper.mapToGroupData(groupDataDto));
       return savedGroupData;

    }

    public void addCustomerToGroup(AddCustomerToGroup addCustomerToGroup){
        GroupData groupData = groupDataRepository.findById(addCustomerToGroup.getGroupId())
                .orElseThrow(()->new GroupNotFoundException(addCustomerToGroup.getGroupId()));
        groupData.getUsers().add(customerService.findById(addCustomerToGroup.getCustomerId()));
        groupDataRepository.save(groupData);
    }

    public Event createEventToGroup(CrateEventToGroup crateEventToGroup , Customer customer){
        GroupData groupData = groupDataRepository.findById(crateEventToGroup.getGroupId())
                .orElseThrow(()->new GroupNotFoundException(crateEventToGroup.getGroupId()));
        crateEventToGroup.getEvent().setGroup(GroupDataMapper.mapToGroupDataDto(groupData));
        return eventService.addEvent(crateEventToGroup.getEvent(),customer);
    }

    public GroupDataResponse getGroupData(Long id){
        GroupData groupData = groupDataRepository.findById(id)
                .orElseThrow(()->new GroupNotFoundException(id));
        Set<Event> events=eventService.getGroupEvents(id);
        return GroupDataResponse.builder()
                .groupData(GroupDataMapper.mapToGroupDataDto(groupData))
                .events(events.stream().map(event -> {
                    event.setGroup(null);
                    return EventMapper.mapToEventDto(event);
                }).collect(Collectors.toSet()))
                .msg("")
                .build();

    }

    public List<GroupDataDto> getGroupsByCustomer(String customerId) {
        List<GroupData> groups= groupDataRepository.findAllByCustomerId(customerId);
        return groups.stream().map(groupData -> {
            GroupDataDto g=GroupDataMapper.mapToGroupDataDto(groupData);
            g.setUsers(null);
            return g;
        }).collect(Collectors.toList());
    }

}
