package com.project.employeeleavemanagement.controller;

import com.project.employeeleavemanagement.entity.LeaveRequest;
import com.project.employeeleavemanagement.service.LeaveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/leave-requests")
@CrossOrigin(origins = "http://192.168.1.9:3000")
public class LeaveRequestController {

    @Autowired
    private LeaveRequestService leaveRequestService;

    // Endpoint for managers to fetch leave requests
    @GetMapping("/manager/{managerId}")
    public ResponseEntity<List<LeaveRequest>> getLeaveRequestsForManager(@PathVariable String managerId) {
        List<LeaveRequest> leaveRequests = leaveRequestService.getLeaveRequestsForManager(managerId);
        return ResponseEntity.ok(leaveRequests);
    }

    @PostMapping
    public ResponseEntity<LeaveRequest> createLeaveRequest(@RequestBody LeaveRequest leaveRequest) {
        try {
            System.out.println("leave request start"+ leaveRequest.getUserId());
            LeaveRequest createdRequest = leaveRequestService.createLeaveRequest(leaveRequest);
            return new ResponseEntity<>(createdRequest, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<List<LeaveRequest>> getAllLeaveRequests() {
        return ResponseEntity.ok(leaveRequestService.getAllLeaveRequests());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LeaveRequest>> getLeaveRequestsByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(leaveRequestService.getLeaveRequestsByUserId(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<LeaveRequest> getLeaveRequestById(@PathVariable String id) {
        return leaveRequestService.getLeaveRequestById(id)
                .map(ResponseEntity::ok)
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<LeaveRequest> updateLeaveRequest(@PathVariable String id, @RequestBody LeaveRequest updatedRequest) {
//        try {
//            LeaveRequest updated = leaveRequestService.updateLeaveRequest(id, updatedRequest);
//            return ResponseEntity.ok(updated);
//        } catch (RuntimeException e) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteLeaveRequest(@PathVariable String id) {
//        leaveRequestService.deleteLeaveRequest(id);
//        return ResponseEntity.noContent().build();
//    }


    @PutMapping("/{leaveId}")
    public ResponseEntity<LeaveRequest> updateLeaveRequestStatus(
            @PathVariable String leaveId,
            @RequestBody Map<String, String> statusUpdate
    ) {
        try {
            String newStatus = statusUpdate.get("status");
            System.out.println(leaveId);
            LeaveRequest updatedRequest = leaveRequestService.updateLeaveRequestStatus(leaveId, newStatus);
            return ResponseEntity.ok(updatedRequest);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}

