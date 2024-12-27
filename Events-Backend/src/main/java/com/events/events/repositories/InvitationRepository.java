package com.events.events.repositories;

import com.events.events.models.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface InvitationRepository extends JpaRepository<Invitation, Long> {
    Optional<Set<Invitation>> findByInvitedUser_Id(String customerid);
}
