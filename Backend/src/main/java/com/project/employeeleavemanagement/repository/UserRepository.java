package com.project.employeeleavemanagement.repository;

import com.project.employeeleavemanagement.entity.Users;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserRepository extends MongoRepository<Users, ObjectId> {
    Users findByUserName(String userName);
    List<Users> findByManagerId(String managerId);
    void deleteByUserName(String userName);
}
