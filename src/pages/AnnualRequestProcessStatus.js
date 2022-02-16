import React, { useState } from 'react';
import apiClient from '../config/apiClient';
// import { Link } from 'react-router-dom';
import { useNavigate as navigate } from 'react-router';
import logoHeader from '../assets/img/logo_header.png';
import icoSearch from '../assets/img/ico_search.png';
import icoMsg from '../assets/img/ico_msg.png';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import calendarStyled from '@emotion/styled';
import AnnualRequestList from '../components/AnnualRequestList';
import AnnualResponseList from '../components/AnnualResponseList';
import '../css/common.css';

const AnnualRequestProcessStatus = (props) => {
  const [currentPage, setCurrentPage] = useState(true);
  const [currentYearMonth, setCurrentYearMonth] = useState();

  // 로그인이 되어 있지 않으면 로그인 페이지로
  if (sessionStorage.getItem('userInfo') === null) {
    return navigate('/login');
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

  // api 불러오기
  const fetchData = async () => {
    handleMonthChange();
    await apiClient.get(`/replace/${currentYearMonth}`);
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
          <p className="page-title">연차 신청 현황</p>
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
            {currentPage ? <AnnualRequestList /> : <AnnualResponseList />}
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

export default AnnualRequestProcessStatus;
