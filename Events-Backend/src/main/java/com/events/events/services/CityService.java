package com.events.events.services;


import com.events.events.exception.CityNotExitException;
import com.events.events.models.City;
import com.events.events.repositories.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CityService {

    @Autowired
    private CityRepository cityRepository;

    public City findByID(Long id){
        return cityRepository.findById(id).orElseThrow(() -> new CityNotExitException(id));
    }

}
