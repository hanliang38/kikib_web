import React, { useEffect, useState } from 'react';
import Navbar from './Navigationbar';
import Footer from './Footer';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import { useLocation, Navigate } from 'react-router-dom';
// import { MdWork } from 'react-icons/md';

axios.withCredentials = true;
axios.defaults.withCredentials = true;

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
  }, [currentYearMonth]);

  useEffect(() => {
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
          color: 'blue',
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
          color: 'blue',
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
          color: 'red',
        };
      });

    // 휴무확인
    const leaveCheckDays = workData
      .filter((item) => item.status === 'LEAVE-CHECK')
      .map((leaveCheckDay) => {
        return {
          date: leaveCheckDay.date,
          title: '휴무',
          color: 'red',
        };
      });

    const annualDays = workData
      .filter((item) => item.status === 'ANNUAL')
      .map((annualDay) => {
        return {
          date: annualDay.date,
          title: '연차',
          color: 'red',
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
    // console.log(workData);
    // console.log('workEvents::', workEvents);
  }, [workData]);

  if (!userInfo) {
    // 없을 때
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  const { userId } = userInfo;

  const fetchData = async (dateString = '') => {
    try {
      setError(null);
      // setCurrentYearMonth(nowYearMonth);
      const response = await axios.get(
        `/api/driver/${userId}?yearMonth=${dateString}`
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
      <Navbar />
      {error && <div>에러가 발생했습니다.</div>}
      {/* {loading && <div>{loadingImg}</div>} */}
      {
        <div className="schedule-page">
          <FullCalendar
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
            locale="ko"
          />
          <div className="leave-work-table">
            <table>
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
          </div>
        </div>
      }
      <Footer />
    </div>
  );
};

export default WorkSchedule;
