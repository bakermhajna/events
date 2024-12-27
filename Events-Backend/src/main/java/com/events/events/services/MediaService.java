package com.events.events.services;


import com.events.events.models.Event;
import com.events.events.models.GroupData;
import com.events.events.models.Media;
import com.events.events.repositories.MediaRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.events.events.utils.IdGenerator.generateId;

@Service
@AllArgsConstructor
public class MediaService {

    @Autowired
    MediaRepository mediaRepository;

    public void addMediaForEvent(Event event,String url){
        Media media=Media.builder()
                .event(event)
                .filePath(url)
                .build();
        mediaRepository.save(media);
    }

    public void addMediaForGroup(GroupData group, String url){
        Media media=Media.builder()
                .groupData(group)
                .filePath(url)
                .build();
        mediaRepository.save(media);
    }

    public Media getMediaByEvent(Event event){
        return mediaRepository.findByEvent(event).get();
    }
    public Media getMediaByGroup(GroupData group){
        return mediaRepository.findByGroupData(group).get();
    }

}
