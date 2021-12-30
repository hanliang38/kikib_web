import React, { useEffect, useState } from 'react';
import Navbar from './Navigationbar';
import Footer from './Footer';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import loadingImg from '../assets/Drawables/icon_progressbar_onloading.png';
import { useLocation, Navigate } from 'react-router-dom';
// import { MdWork } from 'react-icons/md';

axios.withCredentials = true;
axios.defaults.withCredentials = true;

const WorkSchedule = () => {
  const location = useLocation();

  // 근무일 수
  const [workDatas, setWorkDatas] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [monthChange, setMonthChange] = useState('')
  // const [count, setCount] = useState(0);

  useEffect(() => {
    workDay();
  }, []);

  // if (sessionStorage.getItem('userInfo') === null) {
  //   return navigate('/');
  // }

  let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

  if (!userInfo) {
    // 없을 때
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // console.log(userdata);
  const { userId } = userInfo;
  // console.log('userId: ', userId);
  const currentMonth = '2022-01';
  console.log('currentMonth::', currentMonth);

  // 근무일 데이터를 구하기
  const workDay = async () => {
    try {
      setError(null);
      setWorkDatas(null);
      setLoading(true);
      const response = await axios.get(
        `/api/driver/${userId}?yearMonth=${currentMonth}`
      );
      setWorkDatas(response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  if (loading) return <div>{loadingImg}</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!workDatas) return null;

  // console.log('workDatas::', workDatas);

  // obj 분할 (array) status ==> work, work-check, leave, leave-check
  let objs = workDatas.object;
  // console.log('objs::', objs);

  // 근무일
  const workDays = objs
    .filter((item) => item.status === 'WORK')
    .map((workDay) => {
      return {
        date: workDay.date,
        title: '근무',
        color: 'blue',
        url: 'MdWork',
      };
    });
  // console.log(workDays, 'workDays');

  // 근무확인
  const workCheckDays = objs
    .filter((item) => item.status === 'WORK-CHECK')
    .map((workCheckDay) => {
      return {
        date: workCheckDay.date,
        title: '근무',
        color: 'blue',
        url: 'MdWork',
      };
    });
  // console.log(workCheckDays, 'workCheckDays');

  // 휴무일
  const leaveDays = objs
    .filter((item) => item.status === 'LEAVE')
    .map((leaveDay) => {
      return {
        date: leaveDay.date,
        title: '휴무',
        color: 'red',
      };
    });
  // console.log(leaveDays, 'leaveDays');

  // 휴무확인
  const leaveCheckDays = objs
    .filter((item) => item.status === 'LEAVE-CHECK')
    .map((leaveCheckDay) => {
      return {
        date: leaveCheckDay.date,
        title: '휴무',
        color: 'red',
      };
    });
  // console.log(leaveCheckDays, 'leaveCheckDays');

  const annualDays = objs
    .filter((item) => item.status === 'ANNUAL')
    .map((annualDay) => {
      return {
        date: annualDay.date,
        title: '연차',
        color: 'red',
      };
    });
  // console.log(annualDays, 'annualDays');

  const annualCheckDays = objs
    .filter((item) => item.status === 'ANNUAL-CHECK')
    .map((annualCheckDay) => {
      return {
        date: annualCheckDay.date,
        title: '연차',
        color: 'red',
      };
    });
  // console.log(annualCheckDays, 'annualCheckDays');
  // 근무일 수 (work + work-check)
  let day_num = [...workDays, ...workCheckDays].length;

  // 휴무일 수 (leave + leave-check + annual + annual-check)
  let leave_num = [
    ...leaveDays,
    ...leaveCheckDays,
    ...annualDays,
    ...annualCheckDays,
  ].length;

  // 모든 날짜 이벤트
  let allEvents = [
    ...workDays,
    ...workCheckDays,
    ...leaveDays,
    ...leaveCheckDays,
    ...annualDays,
    ...annualCheckDays,
  ];
  // console.log('workEvents::', workEvents);

  // // 이벤트 아이콘 호출하는 함수
  // function renderEventContent(eventInfo) {
  //   return {eventInfo.event.url === "MdWork" ? <MdWork /> : <></>};
  // }

  const handleMonthChange = (e) => {
    const currentDate = e.view.getCurrentData().currentDate;

    if (currentDate instanceof Date) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const dateString = `${year}-${month}`;

      console.log('##', dateString);
    }
  };

  return (
    <div>
      <Navbar />
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
                <th>{day_num}일</th>
                <th>{leave_num}일</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WorkSchedule;
