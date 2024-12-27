package com.events.events.models.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.SuperBuilder;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
@SuperBuilder
public class ErrorDetailsResponse extends Response {

    private  String apiPath;
    private HttpStatus errorCode;

}
