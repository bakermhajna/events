package com.events.events.services;


import com.events.events.dto.CustomerDto;
import com.events.events.exception.customerNotFoundException;
import com.events.events.mappers.CustomerMapper;
import com.events.events.models.Customer;
import com.events.events.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CustomerService {


    @Autowired
    private CustomerRepository customerRepository;

    public Customer findById(String id){
        return customerRepository.findById(id)
                .orElseThrow(() -> new customerNotFoundException(id));
    }

    public Optional<Customer> findByEmail(String email) {
        return customerRepository.findByEmail(email);
    }

    public void saveCustomer(Customer user) {
        customerRepository.save(user);
    }

    public Set<CustomerDto> findByName(String name){
        Set<Customer> customers=customerRepository.findByName(name).orElse(Set.of());
        return customers.stream().map(CustomerMapper::mapToCustomerDto).collect(Collectors.toSet());

    }
}
