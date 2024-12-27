package com.events.events.utils;


import com.events.events.models.Customer;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;


public class ContextHolder {

    public static Customer getCustomerFromContext(){
        return (Customer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }


}
