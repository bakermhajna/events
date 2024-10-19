package com.events.events.exception;

import com.events.events.models.responses.ErrorDetailsResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;


@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(customerNotFoundException.class)
    public ResponseEntity<ErrorDetailsResponse> handlecustomerNotFoundException(customerNotFoundException exception,
                                                                             WebRequest webRequest) {
        ErrorDetailsResponse errorResponseDTO = ErrorDetailsResponse.builder()
                .apiPath(webRequest.getDescription(false))
                .errorCode(HttpStatus.NOT_FOUND)
                .msg(exception.getMessage())
                .responseTime(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(errorResponseDTO, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(CityNotExitException.class)
    public ResponseEntity<ErrorDetailsResponse> handleCityNotExitException(CityNotExitException exception,
                                                                                WebRequest webRequest) {
        ErrorDetailsResponse errorResponseDTO = ErrorDetailsResponse.builder()
                .apiPath(webRequest.getDescription(false))
                .errorCode(HttpStatus.NOT_FOUND)
                .msg(exception.getMessage())
                .responseTime(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(errorResponseDTO, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(EventNotFoundException.class)
    public ResponseEntity<ErrorDetailsResponse> handleEventNotFoundException(EventNotFoundException exception,
                                                                                WebRequest webRequest) {
        ErrorDetailsResponse errorResponseDTO = ErrorDetailsResponse.builder()
                .apiPath(webRequest.getDescription(false))
                .errorCode(HttpStatus.NOT_FOUND)
                .msg(exception.getMessage())
                .responseTime(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(errorResponseDTO, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(GroupNotFoundException.class)
    public ResponseEntity<ErrorDetailsResponse> handleGroupNotFoundException(GroupNotFoundException exception,
                                                                                WebRequest webRequest) {
        ErrorDetailsResponse errorResponseDTO = ErrorDetailsResponse.builder()
                .apiPath(webRequest.getDescription(false))
                .errorCode(HttpStatus.NOT_FOUND)
                .msg(exception.getMessage())
                .responseTime(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(errorResponseDTO, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserExistsException.class)
    public ResponseEntity<ErrorDetailsResponse> handleUserExistsException(UserExistsException exception,
                                                                                WebRequest webRequest) {
        ErrorDetailsResponse errorResponseDTO = ErrorDetailsResponse.builder()
                .apiPath(webRequest.getDescription(false))
                .errorCode(HttpStatus.CONFLICT)
                .msg(exception.getMessage())
                .responseTime(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(errorResponseDTO, HttpStatus.CONFLICT);
    }


}

