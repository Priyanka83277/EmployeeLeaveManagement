package com.project.employeeleavemanagement.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "leaveRequests")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeaveRequest {

    @Id
    private String leaveId; // Unique ID for each leave request
    private String userId; // Reference to the User's ID
    private String leaveType; // e.g., Sick Leave, Annual Leave
    private String status; // e.g., Pending, Approved
    private String reason; // Reason for leave
    private LocalDate startDate; // Leave start date
    private LocalDate endDate; // Leave end date
    private LocalDateTime requestedOn; // Timestamp of request
    private String managerId;
}
