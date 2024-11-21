package com.project.employeeleavemanagement.repository;

import com.project.employeeleavemanagement.entity.LeaveRequest;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LeaveRequestRepository extends MongoRepository<LeaveRequest, String> {

    List<LeaveRequest> findByUserId(String userId);
    List<LeaveRequest> findByUserIdIn(List<String> userIds);
}
