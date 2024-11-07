package com.events.events.services;


import com.events.events.exception.EventNotFoundException;
import com.events.events.mappers.EventMapper;
import com.events.events.models.City;
import com.events.events.models.Customer;
import com.events.events.models.Event;
import com.events.events.dto.EventDto;
import com.events.events.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class EventService {


    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private CityService cityService;

    @Autowired
    private MediaService mediaService;

    public Event addEvent(EventDto eventdto , Customer customer){
        City city=cityService.findByID(eventdto.getCity().getId());
        Event savedEvent = eventRepository.save(EventMapper.mapToEvent(eventdto,city,customer));
        if(eventdto.getFilePath()!=null) {
            mediaService.addMediaForEvent(savedEvent, eventdto.getFilePath());
        }
        return savedEvent;
    }

    public EventDto getEventByIdForCustomer(Long id, Customer customer){
        Event event= eventRepository.findByIdAndCustomer(id,customer).orElseThrow(()->new EventNotFoundException(id));
        return EventMapper.mapToEventDto(event);
    }

    public Set<EventDto> getEventsByCity(Long cityid){
        cityService.findByID(cityid);
        Set<Event> events= eventRepository.findByCity_Id(cityid);
        return events.stream()
                .map(EventMapper::mapToEventDto)
                .collect(Collectors.toSet());
    }

    public Set<Event> getGroupEvents(Long groupid){
        return eventRepository.findByGroup_id(groupid).get();
    }

    public Event getEvent(Long eventId) {
        return eventRepository.findById(eventId).orElseThrow(()->new EventNotFoundException(eventId));
    }
}
