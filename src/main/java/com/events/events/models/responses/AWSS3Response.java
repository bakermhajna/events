package com.events.events.models.responses;


import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class AWSS3Response extends Response{
    private String filepath;

}
