import React, { useEffect, useState } from 'react';
// import Navbar from './Navigationbar';
// import Footer from './Footer';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import { useLocation, Navigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
// import { MdWork } from 'react-icons/md';
// import { device } from './Devices';
import DefaultFont from '../assets/font/agothic14.otf';
import calendarStyled from '@emotion/styled';
import Header from '../components/Header';
// import { configs } from '../config/config';
import apiClient from '../config/apiClient';
import { cleanup } from '@testing-library/react';

axios.withCredentials = true;
axios.defaults.withCredentials = true;

export const StyledWrapper = calendarStyled.div`
.fc-toolbar-title, .fc-col-header-cell-cushion, .fc-daygrid-day-number {
  font-size: 50px;
} 
.fc-event-title {
  font-size: 40px; 
}
.fc-event-title-container{
  text-align: center;
}
.fc-prev-button, .fc-next-button{
  font-size: 30px;
}
`;

const today = new Date();
const nowYear = today.getFullYear();
const nowMonth = today.getMonth() + 1;
const currentMonth = nowMonth < 10 ? `0${nowMonth}` : nowMonth;
const nowYearMonth = `${nowYear}-${currentMonth}`;

const WorkSchedule = () => {
  const location = useLocation();
  let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

  // 근무일 수
  const [workData, setWorkData] = useState([]);
  const [error, setError] = useState(null);
  const [dayNum, setDayNum] = useState(0);
  const [leaveNum, setLeaveNum] = useState(0);
  const [allEvents, setAllEvents] = useState([]);
  const [currentYearMonth, setCurrentYearMonth] = useState(nowYearMonth);

  useEffect(() => {
    // console.log('currentYearMonth', currentYearMonth);
    fetchData(currentYearMonth);
    if (!workData) return;
    cleanup();
    // obj 분할 (array) status ==> work, work-check, leave, leave-check
    // console.log('workData::', workData);
    // console.log('workData.status::', workData);
    // 근무일
    const workDays = workData
      .filter((item) => item.status === 'WORK')
      .map((workDay) => {
        return {
          date: workDay.date,
          title: '근무',
          color: '#007473',
          url: 'MdWork',
        };
      });

    // 근무확인
    const workCheckDays = workData
      .filter((item) => item.status === 'WORK-CHECK')
      .map((workCheckDay) => {
        return {
          date: workCheckDay.date,
          title: '근무',
          color: '#007473',
          url: 'MdWork',
        };
      });

    // 휴무일
    const leaveDays = workData
      .filter((item) => item.status === 'LEAVE')
      .map((leaveDay) => {
        return {
          date: leaveDay.date,
          title: '휴무',
          color: '#cc1a0d',
        };
      });

    // 휴무확인
    const leaveCheckDays = workData
      .filter((item) => item.status === 'LEAVE-CHECK')
      .map((leaveCheckDay) => {
        return {
          date: leaveCheckDay.date,
          title: '휴무',
          color: '#cc1a0d',
        };
      });

    const annualDays = workData
      .filter((item) => item.status === 'ANNUAL')
      .map((annualDay) => {
        return {
          date: annualDay.date,
          title: '연차',
          color: '#cc1a0d',
        };
      });

    const annualCheckDays = workData
      .filter((item) => item.status === 'ANNUAL-CHECK')
      .map((annualCheckDay) => {
        return {
          date: annualCheckDay.date,
          title: '연차',
          color: 'red',
        };
      });
    // 근무일 수 (work + work-check)
    setDayNum([...workDays, ...workCheckDays].length);

    // 휴무일 수 (leave + leave-check + annual + annual-check)
    setLeaveNum(
      [...leaveDays, ...leaveCheckDays, ...annualDays, ...annualCheckDays]
        .length
    );

    // 모든 날짜 이벤트
    setAllEvents([
      ...workDays,
      ...workCheckDays,
      ...leaveDays,
      ...leaveCheckDays,
      ...annualDays,
      ...annualCheckDays,
    ]);
    // console.log('workEvents::', workEvents);
    cleanup();
  }, [workData]);

  // useEffect(() => {
  // }, [workData]);

  if (!userInfo) {
    // 없을 때
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const { userId } = userInfo;

  const fetchData = async (dateString = '') => {
    try {
      setError(null);
      // setCurrentYearMonth(nowYearMonth);
      const response = await apiClient.get(
        `http://kiki-bus.com:8080/api/driver/${userId}?yearMonth=${dateString}`
      );
      let res = response.data.object;
      // console.log(res);
      setWorkData(res);
    } catch (e) {
      setError(e);
    }
  };

  // 근무일 데이터를 구하기
  // * 이부분은 JSX 쪽으로 넣어야 이중렌더링이 발생하지 않는다.
  // if (loading) return <div>{loadingImg}</div>;
  // if (error) return <div>에러가 발생했습니다.</div>;
  // if (!workData) return null;

  // console.log('workData::', workData);

  // // 이벤트 아이콘 호출하는 함수
  // function renderEventContent(eventInfo) {
  //   return {eventInfo.event.url === "MdWork" ? <MdWork /> : <></>};
  // }

  const handleMonthChange = async (e) => {
    try {
      const currentDate = e.view.getCurrentData().currentDate;

      if (currentDate instanceof Date) {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const dateString = `${year}-${month < 10 ? '0' + month : month}`;
        // console.log('dateString', dateString);

        setCurrentYearMonth(dateString);
      }
    } catch (e) {
      console.error();
    }
  };

  return (
    <div>
      <GlobalStyle />
      {/* <Navbar /> */}
      {error && <div>에러가 발생했습니다.</div>}
      {/* {loading && <div>{loadingImg}</div>} */}
      {
        <SchedulePage>
          <Header />
          <PageTitle>근무일정표</PageTitle>
          <StyledWrapper>
            <FullCalendar
              height="1300px"
              datesSet={handleMonthChange}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: 'prev',
                center: 'title',
                right: 'next',
              }}
              // eventContent={renderEventContent}
              events={allEvents}
              eventClick={(event) => {
                // event에서 url 호출 하는걸 막는 방법
                event.jsEvent.cancelBubble = true;
                event.jsEvent.preventDefault();
                event.jsEvent = alert('추후 업데이트 예정입니다.');
              }}
              locale="ko"
            />
          </StyledWrapper>
          <LeaveWorkTable>
            <table width="100%">
              <tbody>
                <tr>
                  <th>근무일</th>
                  <th>휴무일</th>
                </tr>
                <tr>
                  <th>{dayNum}일</th>
                  <th>{leaveNum}일</th>
                </tr>
              </tbody>
            </table>
          </LeaveWorkTable>
        </SchedulePage>
      }
    </div>
  );
};

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'agothic14';
  src: url(${DefaultFont});
}

*{
  margin: 0;
  padding: 0;
  box-sizing: content-box;
  }

body {
  font-family: agothic14;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px
  width: 100vw;
  height: 100vh;
}

#root {
  margin: 10px;
  width: 100vw;
  height: 100vh;
}
`;

const SchedulePage = styled.div`
  margin-top: 100px;
  margin-bottom: 100px;
  text-align: center;
  height: 100vh;
`;

const PageTitle = styled.h1`
  font-size: 80px;
  font-style: bold;
  padding-bottom: 30px;
`;

const LeaveWorkTable = styled.div`
  margin-left: auto;
  text-align: center;
  margin-top: 20px;
  margin-right: auto;
  font-size: 50px;
  &table {
    border: 2px white;
    border-style: solid;
  }
`;
styled.th`
  width: 50%;
  padding: 10px 5px;
  margin-top: 20px;
  justify-content: space-between;
`;
styled.td`
  border-width: 1px;
  padding: 10px 5px;
  border: solid 2px;
  border-color: red;
`;

export default WorkSchedule;
