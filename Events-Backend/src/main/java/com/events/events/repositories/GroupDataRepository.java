package com.events.events.repositories;

import com.events.events.models.GroupData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupDataRepository extends JpaRepository<GroupData, Long> {
    // Custom query methods can be added here
    @Query("SELECT g FROM GroupData g JOIN g.users u WHERE u.id = :customerId")
    List<GroupData> findAllByCustomerId(@Param("customerId") String customerId);

}
