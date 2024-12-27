package com.events.events.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Media {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String filePath;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = true)
    @JsonBackReference
    @ToString.Exclude
    private Event event;


    @ManyToOne
    @JoinColumn(name = "group_data_id", nullable = true)
    @JsonBackReference
    @ToString.Exclude
    private GroupData groupData;

    // Getters and Setters
}

