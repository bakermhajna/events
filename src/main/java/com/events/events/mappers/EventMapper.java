package com.events.events.mappers;

import com.events.events.models.City;
import com.events.events.models.Customer;
import com.events.events.models.Event;
import com.events.events.dto.EventDto;
import com.events.events.models.Media;

import java.util.List;
import java.util.stream.Collectors;

public class EventMapper {

    public static EventDto mapToEventDto(Event event) {
        EventDto eventDto=new EventDto();
        eventDto.setId(event.getId());
        eventDto.setName(event.getName());
        eventDto.setDate(event.getDate());
        eventDto.setLocation(event.getLocation());
        eventDto.setDescription(event.getDescription());
        eventDto.setCapacity(event.getCapacity());
        eventDto.setCustomer(event.getCustomer() !=null?CustomerMapper.mapToCustomerDto(event.getCustomer()):null);
        eventDto.setCity(event.getCity());
        eventDto.setGroup(event.getGroup() != null ?GroupDataMapper.mapToGroupDataDto(event.getGroup()):null);
        eventDto.setFilePath(event.getImageUrls().stream()
                .map(Media::getFilePath)
                .collect(Collectors.toList()));

        return eventDto;
    }

    // Method to map EventDto to Event
    public static Event mapToEvent(EventDto eventDto, City city, Customer customer) {
        Event event = new Event();
        event.setId(eventDto.getId());
        event.setName(eventDto.getName());
        event.setDate(eventDto.getDate());
        event.setLocation(eventDto.getLocation());
        event.setDescription(eventDto.getDescription());
        event.setCapacity(eventDto.getCapacity());
        event.setCustomer(customer);  // Assuming EventDto has the Customer object

        // Set the City entity from the parameter
        event.setCity(city);

        // Set the group(s) from the parameter
        event.setGroup(eventDto.getGroup() != null ?GroupDataMapper.mapToGroupData(eventDto.getGroup()):null);
        event.setImageUrls(
                eventDto.getFilePath().stream()
                        .map(filePath -> Media.builder()
                                .filePath(filePath)
                                .event(event)
                                .build())
                        .collect(Collectors.toList())
        );

        return event;
    }

}
