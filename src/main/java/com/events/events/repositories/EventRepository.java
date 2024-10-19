package com.events.events.repositories;

import com.events.events.models.City;
import com.events.events.models.Customer;
import com.events.events.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    Optional<Event> findByIdAndCustomer(Long id, Customer customer);

    Set<Event> findByCity_Id(Long city);

    Optional<Set<Event>> findByGroup_id(Long id);
}
