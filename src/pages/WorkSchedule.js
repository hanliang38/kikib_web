import React, { useLayoutEffect, useState } from 'react';
// import Navbar from './Navigationbar';
// import Footer from './Footer';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
// import { MdWork } from 'react-icons/md';
// import { device } from './Devices';
import DefaultFont from '../assets/font/agothic14.otf';
import calendarStyled from '@emotion/styled';
import Header from '../components/Header';
// import { configs } from '../config/config';
import apiClient from '../config/apiClient';

axios.withCredentials = true;
axios.defaults.withCredentials = true;

const today = new Date();
const nowYear = today.getFullYear();
const nowMonth = today.getMonth() + 1;
const nextMonth =
  today.getMonth() + 2 < 10 ? `0${today.getMonth() + 2}` : today.getMonth() + 2;
const currentMonth = nowMonth < 10 ? `0${nowMonth}` : nowMonth;
const nowYearMonth = `${nowYear}-${currentMonth}`;
const nextYear = nowMonth === 12 ? nowYear + 1 : nowYear;
const nextYearMonth = `${nextYear}-${nextMonth}`;

const WorkSchedule = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // const title = '근무일정표';
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  const busRouteId = sessionStorage.getItem('routeId');

  // 근무일 수
  const [dayNum, setDayNum] = useState(0);
  const [leaveNum, setLeaveNum] = useState(0);
  const [annualNum, setAnnualNum] = useState(0);
  const [allEvents, setAllEvents] = useState([]);
  const [currentYearMonth, setCurrentYearMonth] = useState(nowYearMonth);
  const [workList, setWorkList] = useState([]);
  const [leaveData, setLeaveData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [applyTerm, setApplyTerm] = useState();

  const fetchData = async () => {
    await apiClient
      .get(`/driver/work?yearMonth=${currentYearMonth}`)
      .then((res) => {
        // console.log(res);
        const dataObj = res.data.object;
        next(dataObj);
        // console.log(dataObj);

        // 휴무, 연차 신청에 사용할 데이터 (workId)
        // console.log(dataObj);
        const idArr = [];
        dataObj
          .filter(
            (item) => item.status === 'WORK' || item.status === 'WORK-CHECK'
          )
          .map((work) => {
            // console.log(idArr);
            return idArr.push({ id: work.id, date: work.date });
          });
        // console.log(idArr);
        setWorkList(idArr);
        setAllData(dataObj);
      });

    // 선택 가능한 휴무일 날짜
    await apiClient
      .get(`/driver/leave?yearMonth=${currentYearMonth}`)
      .then((res) => {
        const leaveObj = res.data.object;
        setLeaveData(leaveObj);
      });

    // 휴무신청일 API 구하기
    await apiClient
      .get(`/work/${busRouteId}/term?yearMonth=${nextYearMonth}`)
      .then((res) => {
        setApplyTerm(res.data.object);
      });
  };

  useLayoutEffect(() => {
    fetchData(currentYearMonth);
  }, [currentYearMonth]);

  const next = (data) => {
    // if (!workData) return;
    // obj 분할 (array) status ==> work, work-check, leave, leave-check
    // 근무일
    // console.log('workData::', data);
    const workDays = data
      .filter((item) => item.status === 'WORK')
      .map((workDay) => {
        return {
          date: workDay.date,
          title: '근무',
          color: '#007473',
          Image: 'MdWork',
        };
      });

    // 근무확인
    const workCheckDays = data
      .filter((item) => item.status === 'WORK-CHECK')
      .map((workCheckDay) => {
        return {
          date: workCheckDay.date,
          title: '근무',
          color: '#007473',
          Image: 'Mdwork',
        };
      });

    // 중도귀가
    const LeaveEarlyDays = data
      .filter((item) => item.status === 'LEAVE_EARLY')
      .map((workCheckDay) => {
        return {
          date: workCheckDay.date,
          title: '근무*',
          color: '#007473',
          Image: 'Mdwork',
          fontSize: '10px',
        };
      });

    // 휴무일
    const leaveDays = data
      .filter((item) => item.status === 'LEAVE')
      .map((leaveDay) => {
        return {
          date: leaveDay.date,
          title: '휴무',
          color: '#cc1a0d',
        };
      });

    // 휴무확인
    const leaveCheckDays = data
      .filter((item) => item.status === 'LEAVE-CHECK')
      .map((leaveCheckDay) => {
        return {
          date: leaveCheckDay.date,
          title: '휴무',
          color: '#cc1a0d',
        };
      });

    const annualDays = data
      .filter((item) => item.status === 'ANNUAL')
      .map((annualDay) => {
        return {
          date: annualDay.date,
          title: '연차',
          color: '#cc1a0d',
        };
      });

    const annualCheckDays = data
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
    setLeaveNum([...leaveDays, ...leaveCheckDays].length);
    // 연차일 수 (annual + annual-check)
    setAnnualNum([...annualDays, ...annualCheckDays].length);

    // 모든 날짜 이벤트
    setAllEvents([
      ...workDays,
      ...workCheckDays,
      ...LeaveEarlyDays,
      ...leaveDays,
      ...leaveCheckDays,
      ...annualDays,
      ...annualCheckDays,
    ]);
  };

  if (!userInfo) {
    // 없을 때
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

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
      {/* {error && <div>에러가 발생했습니다.</div>} */}
      {/* {loading && <div>{loadingImg}</div>} */}
      <SchedulePage>
        <Header />
        <PageTitle>근무일정표</PageTitle>
        <StyledWrapper>
          <FullCalendar
            height="80vh"
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
            // eventClick={(event) => {
            //   // event에서 url 호출 하는걸 막는 방법
            //   event.jsEvent.cancelBubble = true;
            //   event.jsEvent.preventDefault();
            //   // event.jsEvent = alert('추후 업데이트 예정입니다.');
            // }}
            // 날짜 클릭 이벤트
            dateClick={(info) => {
              info.jsEvent.preventDefault(); // don't let the browser navigate
              // info.jsEvent = alert('추후 업데이트 예정입니다.');
              info.jsEvent = navigate('/workerAndOff', {
                state: {
                  date: info.dateStr,
                  workList: workList,
                  leaveData: leaveData,
                  allData: allData,
                  applyTerm: applyTerm,
                  applyTarget: nextYearMonth,
                },
              });
            }}
            locale="ko"
          />
          {/* {console.log(allData)} */}
        </StyledWrapper>
        <LeaveWorkTable>
          <table width="100%">
            <tbody>
              <tr>
                <th>근무일</th>
                <th>휴무일</th>
                <th>연차</th>
              </tr>
              <tr>
                <th>{dayNum}일</th>
                <th>{leaveNum}일</th>
                <th>{annualNum}일</th>
              </tr>
            </tbody>
          </table>
        </LeaveWorkTable>
      </SchedulePage>
    </div>
  );
};

export const StyledWrapper = calendarStyled.div`
.fc-toolbar-title, .fc-col-header-cell-cushion, .fc-daygrid-day-number {
  font-size: 20px;
} 
.fc-event-title {
  font-size: 5vw; 
}
.fc-event-title-container{
  text-align: center;
}
.fc-prev-button, .fc-next-button{
  font-size: 15px;
}
`;

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
  margin-top: 50px;
  text-align: center;
  height: 100vh;
`;

const PageTitle = styled.h1`
  font-size: 40px;
  font-style: bold;
  padding-bottom: 10px;
`;

const LeaveWorkTable = styled.div`
  margin-left: auto;
  text-align: center;
  margin-top: 20px;
  margin-right: auto;
  font-size: 30px;
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
