# Use Amazon Corretto JDK 17 as the base image
FROM amazoncorretto:17-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the Spring Boot application's JAR file to the container
COPY target/events-backend-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your Spring Boot application will run on
EXPOSE 8080

# Set the command to run your Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
