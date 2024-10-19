package com.events.events.exception;

public class CityNotExitException extends CoreException{

    public CityNotExitException(Long id){
        super("city with id "+id+" not exist in the database");
    }
}
