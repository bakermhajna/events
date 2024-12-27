package com.events.events.models.requests;


import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Builder
public class InvitationRequest {

    private Set<String> invitedCustomers;
    private Long eventId;


}
