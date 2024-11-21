package com.project.employeeleavemanagement.service;


import com.project.employeeleavemanagement.entity.Users;
import com.project.employeeleavemanagement.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;


@Service
@Slf4j
public class UserService {
    @Autowired
    private UserRepository userRepository;


    public void saveNewUser(Users user){
        try {
            user.setRole("user");
            user.setManagerId("54321");
            userRepository.save(user);
        }catch (Exception e){
//            throw new RuntimeException("A user with the username '" + user.getUserName() + "' already exists.");
            log.error("hh");
        }
    }

    public Users login(String userName, String password){
        Users users = userRepository.findByUserName(userName);
        if (users == null) {
            return null; // User not found
        }
        return users.getPassword().equals(password)?users:null;

    }

}
