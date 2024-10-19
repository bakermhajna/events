package com.events.events.services;


import com.events.events.exception.customerNotFoundException;
import com.events.events.models.Customer;
import com.events.events.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

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
}
