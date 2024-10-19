package com.events.events.exception;

public class EventNotFoundException extends CoreException{

    public EventNotFoundException(Long id){
        super("event with id "+id+" not found" );
    }
}
