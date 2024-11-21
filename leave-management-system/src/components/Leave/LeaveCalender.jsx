import React, { useState } from "react";
import Calendar from "react-calendar";

function LeaveCalendar() {
  const [leaveDates] = useState(["2024-11-20", "2024-11-21"]);

  return (
    <div>
      <h1>Leave Calendar</h1>
      <Calendar
        tileClassName={({ date }) =>
          leaveDates.includes(date.toISOString().split("T")[0]) ? "leave-day" : null
        }
      />
    </div>
  );
}

export default LeaveCalendar;
