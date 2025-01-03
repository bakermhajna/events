package com.events.events.utils;

import com.events.events.dto.EventDto;
import com.events.events.models.City;
import com.events.events.models.Customer;
import com.events.events.models.auth.registerDetails;
import com.events.events.repositories.CityRepository;
import com.events.events.repositories.CustomerRepository;
import com.events.events.repositories.EventRepository;
import com.events.events.services.AuthService;
import com.events.events.services.EventService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class DataInitializer {

    @Autowired
    private  CityRepository cityRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private AuthService authService;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventService eventService;

    @PostConstruct
    public void init() {
        if (cityRepository.count() == 0) {
            cityRepository.save(new City(1L, "ام الفحم"));
            cityRepository.save(new City(2L, "Los Angeles"));
        }
        if(customerRepository.count()==0){
            authService.registerForDataInit(registerDetails.builder()
                    .Email("mhajnabaker@gmail.com")
                    .name("baker")
                    .password("1234")
                    .phoneNumber("0522451755")
                    .build());
        }
        if(eventRepository.count()==0){
            Customer customer=customerRepository.findByEmail("mhajnabaker@gmail.com").get();
            eventService.addEvent(EventDto.builder()
                            .name("محمد فايز بدوية")
                            .description("افراح العرايش العريس محمد فايز بدوية")
                            .location("الواحة")
                            .capacity(500)
                            .city(cityRepository.findById(1L).get())
                            .date(LocalDate.now())
                            .filePath(List.of("https://bakermhajna.s3.us-east-1.amazonaws.com/Screenshot_20241130_195514_WhatsApp.jpg")).build()
                    , customer);
        }
    }
}
