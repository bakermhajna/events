package com.events.events.repositories;

import com.events.events.models.Event;
import com.events.events.models.GroupData;
import com.events.events.models.Invitation;
import com.events.events.models.Media;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MediaRepository extends JpaRepository<Media, Long> {

    Optional<Media> findByEvent(Event event);
    Optional<Media> findByGroupData(GroupData groupData);
}
