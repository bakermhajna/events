package com.events.events.models.requests;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddCustomerToGroup {

    private Long groupId;

    private String customerId;
}
