package com.events.events.services;


import com.events.events.repositories.MediaRepository;
import com.events.events.utils.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.core.async.AsyncRequestBody;
import software.amazon.awssdk.core.async.AsyncResponseTransformer;
import software.amazon.awssdk.services.s3.S3AsyncClient;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.CompletableFuture;

@Service
public class AwsS3Service {

    @Autowired
    private S3Client s3Client;

    @Autowired
    private  S3AsyncClient s3AsyncClient;

    @Value("${cloud.aws.bucket}")
    private String bucketName;

    @Value("${cloud.aws.region.static}")
    private String reagon;


    public CompletableFuture<String> uploadLocalFileAsync(MultipartFile file) {
        try {
            String FileName=file.getOriginalFilename()+"."+FileUtils.getFileExtension(file);

            // Prepare the PutObjectRequest
            PutObjectRequest objectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)  // Replace with your actual bucket name
                    .key(FileName)
                    .build();

            // Convert MultipartFile to bytes
            byte[] fileBytes = file.getBytes();

            // Upload file asynchronously
            CompletableFuture<PutObjectResponse> response = s3AsyncClient.putObject(objectRequest, AsyncRequestBody.fromBytes(fileBytes));

            return response.whenComplete((resp, ex) -> {
                if (ex != null) {
                    System.err.println("Failed to upload file: " + ex.getMessage());
                    throw new RuntimeException("Failed to upload file", ex);
                } else {
                    System.out.println("File uploaded successfully to " + bucketName + "/" + FileName);
                }
            }).thenApply(resp -> {
                // Construct the URL of the uploaded file
                return "https://" + bucketName + ".s3." + reagon + ".amazonaws.com/" + FileName;
            });
        } catch (Exception e) {
            throw new RuntimeException("Failed to read file bytes", e);
        }
    }

    public void listBuckets() {
        ListBucketsResponse listBucketsResponse = s3Client.listBuckets();

        for (Bucket bucket : listBucketsResponse.buckets()) {
            System.out.println(bucket.name());
        }
    }


}
