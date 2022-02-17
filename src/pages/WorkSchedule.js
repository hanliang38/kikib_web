import React, { useEffect, useState } from 'react';
import icoBack from '../assets/img/ico_back.png';
import icoSearch from '../assets/img/ico_search.png';
import icoMsg from '../assets/img/ico_msg.png';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import apiClient from '../config/apiClient';
import '../css/common.css';
import '../css/management.css';

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
  const [getCurrentMonth, setCurrentMonth] = useState(nowYearMonth);
  const [workList, setWorkList] = useState([]);
  const [leaveData, setLeaveData] = useState([]);
  const [applyTerm, setApplyTerm] = useState('');
  const [nextMonthWork, setNextMonthWork] = useState();

  useEffect(() => {
    fetchData(currentYearMonth);
  }, [currentYearMonth]);

  const fetchData = async () => {
    await apiClient
      .get(`/driver/work?yearMonth=${currentYearMonth}`)
      .then((res) => {
        // console.log(res);
        const dataObj = res.data.object;
        next(dataObj);
        // console.log(dataObj);
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
        // console.log(res);
      });

    // 다음달 휴무신청 날짜들
    await apiClient
      .get(`/driver/work?yearMonth=${nextYearMonth}`)
      .then((res) => {
        setNextMonthWork(res.data.object);
      });
    debugger;
  };
  debugger;
  const next = (data) => {
    debugger;
    // 휴무, 연차 신청에 사용할 데이터 (workId)
    const idArr = data
      .filter((item) => item.status === 'WORK' || item.status === 'WORK-CHECK')
      .map((work) => {
        // console.log(idArr);
        return { id: work.id, date: work.date };
      });
    // console.log(idArr);

    // obj 분할 (array) status ==> work, work-check, leave, leave-check
    // 근무일
    // console.log('workData::', data);
    const workDays = data
      .filter((item) => item.status === 'WORK' || item.status === 'WORK-CHECK')
      .map((workDay) => {
        return {
          date: workDay.date,
          title: '근무',
          color: '#007473',
          Image: 'MdWork',
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
      .filter(
        (item) => item.status === 'LEAVE' || item.status === 'LEAVE-CHECK'
      )
      .map((leaveDay) => {
        return {
          date: leaveDay.date,
          title: '휴무',
          color: 'transparent',
        };
      });

    const annualDays = data
      .filter(
        (item) => item.status === 'ANNUAL' || item.status === 'ANNUAL-CHECK'
      )
      .map((annualDay) => {
        return {
          date: annualDay.date,
          title: '연차',
          color: '#cc1a0d',
        };
      });

    setWorkList(idArr);

    // 근무일 수 (work + work-check)
    setDayNum([...workDays].length);

    // 휴무일 수 (leave + leave-check + annual + annual-check)
    setLeaveNum([...leaveDays].length);

    // 연차일 수 (annual + annual-check)
    setAnnualNum([...annualDays].length);

    // 모든 날짜 이벤트
    setAllEvents([...workDays, ...LeaveEarlyDays, ...leaveDays, ...annualDays]);
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
        setCurrentMonth(month);
      }
    } catch {}
  };

  return (
    <>
      <div className="container management">
        <header>
          <div className="btn-back">
            <button onClick={() => navigate(-1)}>
              <img src={icoBack} alt="뒤로가기" />
            </button>
          </div>
          <p className="page-title">근무일정표</p>
          <div className="btn-box">
            <a href="#!" className="btn-search">
              <img src={icoSearch} alt="검색" />
            </a>
            <a href="#!" className="btn-msg">
              <img src={icoMsg} alt="메시지" />
            </a>
          </div>
        </header>

        <div className={'calendar-wrap month-' + getCurrentMonth}>
          <FullCalendar
            datesSet={handleMonthChange}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev',
              center: 'title',
              right: 'next',
            }}
            events={allEvents}
            // 날짜 클릭 이벤트
            dateClick={(info) => {
              info.jsEvent.preventDefault();
              // info.jsEvent = alert('추후 업데이트 예정입니다.');
              info.jsEvent = navigate('/workerAndOff', {
                state: {
                  date: info.dateStr,
                  workList: workList,
                  leaveData: leaveData,
                  applyTerm: applyTerm,
                  applyTarget: nextYearMonth,
                  nextMonthWork: nextMonthWork,
                },
              });
            }}
            locale="ko"
          />
          {/* {console.log(applyTerm)} */}

          <div className="work-days">
            <ul className="days-list">
              <li>
                <span>근무</span>
                <br />
                <strong>{dayNum}일</strong>
              </li>
              <li>
                <span>휴무</span>
                <br />
                <strong>{leaveNum}일</strong>
              </li>
              <li>
                <span>연차</span>
                <br />
                <strong>{annualNum}일</strong>
              </li>
            </ul>
          </div>
        </div>

        <nav className="nav">
          <ul className="nav-list">
            <li>
              <a href="/main">
                <span className="blind">홈</span>
              </a>
            </li>
            <li className="on">
              <a href="/management">
                <span className="blind">근무관리</span>
              </a>
            </li>
            <li>
              <a href="#!">
                <span className="blind">배차일보</span>
              </a>
            </li>
            <li>
              <a href="#!">
                <span className="blind">사용자설정</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default WorkSchedule;
