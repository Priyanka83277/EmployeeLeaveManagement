package com.project.employeeleavemanagement.service;

import com.project.employeeleavemanagement.entity.LeaveRequest;
import com.project.employeeleavemanagement.entity.Users;
import com.project.employeeleavemanagement.repository.LeaveRequestRepository;
import com.project.employeeleavemanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LeaveRequestService {
    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private UserRepository usersRepository;

    // Get all leave requests submitted by employees managed by a specific manager
    public List<LeaveRequest> getLeaveRequestsForManager(String managerId) {
        // Fetch all employees managed by the given manager
        List<Users> employees = usersRepository.findByManagerId(managerId);

        // Extract employee IDs
        List<String> employeeIds = employees.stream()
                .map(Users::getId)
                .collect(Collectors.toList());

        // Fetch leave requests for these employees
        return leaveRequestRepository.findByUserIdIn(employeeIds);
    }

    public LeaveRequest createLeaveRequest(LeaveRequest leaveRequest) {
//        leaveRequest.setStatus("Pending"); // Default status
        return leaveRequestRepository.save(leaveRequest);
    }

    public List<LeaveRequest> getAllLeaveRequests() {
        return leaveRequestRepository.findAll();
    }

    public List<LeaveRequest> getLeaveRequestsByUserId(String userId) {
        return leaveRequestRepository.findByUserId(userId);
    }

    public Optional<LeaveRequest> getLeaveRequestById(String id) {

        return leaveRequestRepository.findById(id);
    }

    public LeaveRequest updateLeaveRequest(String id, LeaveRequest updatedRequest) {
        return leaveRequestRepository.findById(id)
                .map(existingRequest -> {
                    existingRequest.setLeaveType(updatedRequest.getLeaveType());
                    existingRequest.setStartDate(updatedRequest.getStartDate());
                    existingRequest.setEndDate(updatedRequest.getEndDate());
                    existingRequest.setReason(updatedRequest.getReason());
                    existingRequest.setStatus(updatedRequest.getStatus());
                    return leaveRequestRepository.save(existingRequest);
                }).orElseThrow(() -> new RuntimeException("Leave Request not found"));
    }

    public void deleteLeaveRequest(String id) {
        leaveRequestRepository.deleteById(id);
    }

    public LeaveRequest updateLeaveRequestStatus(String leaveId, String status) {
        LeaveRequest leaveRequest = leaveRequestRepository.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave Request not found"));

        leaveRequest.setStatus(status);
        return leaveRequestRepository.save(leaveRequest);
    }
}
