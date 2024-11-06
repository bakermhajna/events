package com.events.events.controllers;


import com.events.events.models.responses.AWSS3Response;
import com.events.events.services.AwsS3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.atomic.AtomicReference;

@RestController
@RequestMapping("/file")
public class AWSS3 {

    @Autowired
    private AwsS3Service awsS3Service;

    @PostMapping("/upload")
    public CompletableFuture<ResponseEntity<AWSS3Response>> uploadFile(@RequestParam(value = "file") MultipartFile file) {
        return awsS3Service.uploadLocalFileAsync(file)
                .thenApply(filePath -> ResponseEntity.ok(AWSS3Response.builder()
                        .msg("File Uploaded")
                        .filepath(filePath)
                        .build()));
    }

}
