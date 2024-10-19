package com.events.events.mappers;


import com.events.events.models.Customer;
import com.events.events.models.GroupData;
import com.events.events.dto.CustomerDto;
import com.events.events.dto.GroupDataDto;
import java.util.Set;
import java.util.stream.Collectors;


public class GroupDataMapper {


    public static GroupDataDto mapToGroupDataDto(GroupData groupData){
        Set<CustomerDto> customersDto=groupData.getUsers().stream().map(CustomerMapper::mapToCustomerDto).collect(Collectors.toSet());
        return GroupDataDto.builder()
                .id(groupData.getId())
                .name(groupData.getName())
                .admin(CustomerMapper.mapToCustomerDto(groupData.getAdmin()))
                .users(customersDto)
                .build();
    }

    public static GroupData mapToGroupData(GroupDataDto groupDataDto){
        Set<Customer> customers= groupDataDto.getUsers().stream().map(CustomerMapper::mapToCustomer).collect(Collectors.toSet());
        return GroupData.builder()
                .id(groupDataDto.getId())
                .name(groupDataDto.getName())
                .admin(CustomerMapper.mapToCustomer(groupDataDto.getAdmin()))
                .users(groupDataDto.getUsers() != null ? customers : Set.of())
                .build();
    }

}
