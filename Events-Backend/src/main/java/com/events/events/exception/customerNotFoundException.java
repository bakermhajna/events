package com.events.events.exception;

public class customerNotFoundException extends CoreException{

    public customerNotFoundException(String id){
        super("customer with "+id+" id not found");
    }
}
