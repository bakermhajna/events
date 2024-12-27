package com.events.events.exception;


public class UserExistsException extends CoreException {
    public UserExistsException(String email) {
        super("User with this email exists " + email);
    }
}
