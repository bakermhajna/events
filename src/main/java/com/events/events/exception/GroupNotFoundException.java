package com.events.events.exception;

public class GroupNotFoundException extends CoreException{

    public GroupNotFoundException(Long id){
        super("group with id "+id+ "not found");
    }
}
