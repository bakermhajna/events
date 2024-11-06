package com.events.events.controllers;


import com.events.events.services.AwsS3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/test")
public class testController {


    @Autowired
    private AwsS3Service awsS3Service;

    @PostMapping("/upload")
    public void uploadfile(@RequestParam(value = "file")MultipartFile file){
        awsS3Service.uploadLocalFileAsync("testFile1",file).thenAccept(System.out::println);

    }

    @GetMapping("/test")
    public void uploadtfile(){
        awsS3Service.listBuckets();
    }

    @GetMapping("/get/{name}")
    public void uploadtfile(@PathVariable String name){
        awsS3Service.getObjectBytesAsync(name);
    }

}
