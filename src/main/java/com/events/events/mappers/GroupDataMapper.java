package com.events.events.mappers;


import com.events.events.models.Customer;
import com.events.events.models.GroupData;
import com.events.events.dto.CustomerDto;
import com.events.events.dto.GroupDataDto;
import com.events.events.models.Media;

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
                .filePath(groupData.getImageUrls().stream()
                        .map(Media::getFilePath)
                        .collect(Collectors.toList()))
                .build();
    }

    public static GroupData mapToGroupData(GroupDataDto groupDataDto){
        Set<Customer> customers= groupDataDto.getUsers().stream().map(CustomerMapper::mapToCustomer).collect(Collectors.toSet());
        GroupData groupData=new GroupData();
        groupData.setId(groupDataDto.getId());
        groupData.setName(groupDataDto.getName());
        groupData.setAdmin(CustomerMapper.mapToCustomer(groupDataDto.getAdmin()));
        groupData.setUsers(customers);
        groupData.setImageUrls(
                groupDataDto.getFilePath().stream()
                        .map(filePath -> Media.builder()
                                .filePath(filePath)
                                .groupData(groupData)
                                .build())
                        .collect(Collectors.toList())
        );
        return groupData;
    }

}
