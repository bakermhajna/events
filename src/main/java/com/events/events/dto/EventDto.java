package com.events.events.dto;

import com.events.events.models.City;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class EventDto {

    private Long id;

    private String name;

    private LocalDate date;

    private String location;

    private String description;

    private Integer capacity;

    private City city;

    private CustomerDto customer;

    private GroupDataDto group;

}
