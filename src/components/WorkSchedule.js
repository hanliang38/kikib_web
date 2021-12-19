import React from 'react';
import Navbar from './Navigationbar';
import Footer from './Footer';
// import { Calendar } from '@fullcalendar/core';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

const WorkSchedule = () => {
  return (
    <div>
      <Navbar />
      <div className="schedule-page">
        <FullCalendar
          plugins={[dayGridPlugin]}
          eventContent={renderEventContent}
          initialView="dayGridMonth"
        />
        <div className="leave-work-table">
          <table>
            <tr>
              <th>근무일</th>
              <th>휴무일</th>
              <th>잔여연차</th>
            </tr>
            <tr>
              {/* <th>{workday}일</th> */}
              {/* <th>{dayoff}일</th> */}
              {/* <th>{annual_leave}회</th> */}
            </tr>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export default WorkSchedule;
