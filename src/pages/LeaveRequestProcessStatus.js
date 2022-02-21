import React, { useState, useEffect } from 'react';
import apiClient from '../config/apiClient';
import { useNavigate as navigate } from 'react-router';
import logoHeader from '../assets/img/logo_header.png';
import icoSearch from '../assets/img/ico_search.png';
import icoMsg from '../assets/img/ico_msg.png';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import calendarStyled from '@emotion/styled';
import LeaveRequestList from '../components/LeaveRequestList';
import LeaveResultList from '../components/LeaveResultList';
import '../css/common.css';

const today = new Date();
const nowYear = today.getFullYear();
const nowMonth = today.getMonth() + 1;
const currentMonth = nowMonth < 10 ? `0${nowMonth}` : nowMonth;
const nowYearMonth = `${nowYear}-${currentMonth}`;

const LeaveRequestProcessStatus = (props) => {
  const [currentPage, setCurrentPage] = useState(true);
  const [yearMonth, setYearMonth] = useState(nowYearMonth);
  const [reqData, setReqData] = useState();
  const [resultData, setResultData] = useState();
  // const [leave]

  useEffect(() => {
    fetchData(yearMonth);
  }, [yearMonth]);

  // 로그인이 되어 있지 않으면 로그인 페이지로
  if (sessionStorage.getItem('userInfo') === null) {
    return navigate('/login');
  }
  const handleMonthChange = async (e) => {
    const currentDate = e.view.getCurrentData().currentDate;

    if (currentDate instanceof Date) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const dateString = `${year}-${month < 10 ? '0' + month : month}`;

      setYearMonth(dateString);
    }
  };

  // api 불러오기
  const fetchData = async () => {
    // api 불러오기
    await apiClient
      .get(`/driver/leave/request?yearMonth=${yearMonth}`)
      .then((res) => {
        console.log(res);
        // 신청내역 데이터
        const req = res.data.object;
        const leaveReq = req.filter((item) => item.status === 'REQUEST');
        reqNext(leaveReq);
        // console.log(leaveReq);

        // 처리결과 데이터
        const result = res.data.object;
        const leaveResult = result.filter(
          (item) => item.status === 'ACCEPT' || item.status === 'DENY'
        );
        // console.log('leaveResult', leaveResult);
        resultNext(leaveResult);
      });
  };

  // req next
  const reqNext = (data) => {
    const reqList = data.map((item) => {
      return {
        dayOffId: item.dayOffId,
        driverName: item.driverName,
        originLeaves: item.originLeaves,
        date: item.originLeaves.map((item) => `${item.split('-')[2]}일`),
        workDate: item.workDate.split('-'),
      };
    });
    console.log('reqList', reqList);
    setReqData(reqList);
  };

  // result next
  const resultNext = (data) => {
    const resultList = data.map((item) => {
      return {
        dayOffId: item.dayOffId,
        driverName: item.driverName,
        originLeaves: item.originLeaves,
        date: item.originLeaves.map((item) => `${item.split('-')[2]}일`),
        status: item.status,
        workDate: item.workDate.split('-'),
        // ++ 배차완료시킨 관리자명 추가
      };
    });
    console.log('resultList', resultList);
    setResultData(resultList);
  };

  return (
    <>
      <div className="container timetable">
        <header>
          <div className="logo">
            <a href="/main">
              <img src={logoHeader} alt="kikiB" />
            </a>
          </div>
          <p className="page-title">휴무 신청 현황</p>
          <div className="btn-box">
            <a href="#!" className="btn-search">
              <img src={icoSearch} alt="검색" />
            </a>
            <a href="#!" className="btn-msg">
              <img src={icoMsg} alt="메시지" />
            </a>
          </div>
        </header>
        <div className="inner">
          <StyledWrapper>
            <FullCalendar
              height="10vh"
              datesSet={handleMonthChange}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: 'prev',
                center: 'title',
                right: 'next',
              }}
              locale="ko"
            />
          </StyledWrapper>

          <div className="current-content">
            {' '}
            <div className="tab-list">
              <a
                href="#!"
                className={currentPage ? 'btn-tab on' : 'btn-tab'}
                onClick={() => setCurrentPage(true)}
              >
                신청내역
              </a>
              <a
                href="#!"
                className={currentPage ? 'btn-tab' : 'btn-tab on'}
                onClick={() => setCurrentPage(false)}
              >
                처리결과
              </a>
            </div>
            {currentPage ? (
              <LeaveRequestList reqData={reqData} />
            ) : (
              <LeaveResultList resultData={resultData} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const StyledWrapper = calendarStyled.div`
.fc-view-harness{
  display: none;
}
.fc-toolbar-title{ 
  font-size:30px;
}
.fc-prev-button { color: black; background-color: transparent; border:none;}
.fc-prev-button :before{ color: black;}
.fc-toolbar-chunk {font-size:30px;}
.fc-next-button{ color: black; background-color: transparent; border:none;}
.fc-next-button :before{ color: black; background-color: transparent; border:none;}
`;

export default LeaveRequestProcessStatus;
