package com.project.employeeleavemanagement.mapper;

import com.project.employeeleavemanagement.dto.UserDTO;
import com.project.employeeleavemanagement.entity.Users;

public class UsersMapper {
    public static UserDTO toDTO(Users users){
        return new UserDTO(users.getId(),users.getUserName(),users.getPassword());
    }
}
