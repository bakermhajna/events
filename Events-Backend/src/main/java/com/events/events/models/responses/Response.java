package com.events.events.models.responses;



import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class Response {

    @NonNull
    private String msg;
    @Builder.Default
    private LocalDateTime responseTime =LocalDateTime.now();
}
