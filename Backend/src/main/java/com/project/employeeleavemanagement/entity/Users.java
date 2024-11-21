package com.project.employeeleavemanagement.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Users {

    @Id
    private String id;
    @Indexed(unique = true)
    @NonNull
    private String userName;
    @NonNull
    private String password;
    private String role; // e.g., "Employee", "Manager"
    private String managerId; // Reference to the manager

    @DBRef
    private List<LeaveRequest> leaveRequests = new ArrayList<>();


}
