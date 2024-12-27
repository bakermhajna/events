package com.events.events.config;



import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3AsyncClient;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3Configuration;

@Configuration
public class BucketConfig {

    @Value("${cloud.aws.credentials.access-key}")
    private String awsAccessKey;

    @Value("${cloud.aws.credentials.secret-key}")
    private String awsSecretKey;


    @Bean
    public S3Client getAmazonS3Client() {
        AwsBasicCredentials awsCreds = AwsBasicCredentials.create(
                awsAccessKey,
                awsSecretKey);
        Region region = Region.US_EAST_1;
        S3Client s3 = S3Client.builder()
                .credentialsProvider(StaticCredentialsProvider.create(awsCreds))
                .region(region)
                .build();

        return s3;
    }

    @Bean
    public S3AsyncClient getAmazonS3AsyncClient() {
        AwsBasicCredentials awsCreds = AwsBasicCredentials.create(
                awsAccessKey,
                awsSecretKey);
        Region region = Region.US_EAST_1;
        S3AsyncClient s3AsyncClient = S3AsyncClient.builder()
                .region(region)
                .credentialsProvider(StaticCredentialsProvider.create(awsCreds))
                .build();

        return s3AsyncClient;
    }
}