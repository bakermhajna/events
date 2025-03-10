package com.events.events.exception;

import com.events.events.models.responses.ErrorDetailsResponse;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;


@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {


    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,HttpHeaders headers, HttpStatusCode status, WebRequest request) {

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorDetailsResponse> handleConstraintViolationException(
            ConstraintViolationException ex, WebRequest request) {

        ErrorDetailsResponse errorResponseDTO = ErrorDetailsResponse.builder()
                .apiPath(request.getDescription(false))
                .errorCode(HttpStatus.BAD_REQUEST)
                .msg(ex.getMessage())
                .responseTime(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(errorResponseDTO, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorDetailsResponse> handleBadCredentialsException(BadCredentialsException exception,
                                                                             WebRequest webRequest) {
        ErrorDetailsResponse errorResponseDTO = ErrorDetailsResponse.builder()
                .apiPath(webRequest.getDescription(false))
                .errorCode(HttpStatus.NOT_FOUND)
                .msg(exception.getMessage())
                .responseTime(LocalDateTime.now())
                .build();
        return new ResponseEntity<>(errorResponseDTO, HttpStatus.NOT_FOUND);
    }

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

