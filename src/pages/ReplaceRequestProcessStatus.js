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
import ReplaceRequestList from '../components/ReplaceRequestList';
import ReplaceResponseList from '../components/ReplaceResponseList';
import '../css/common.css';

const ReplaceRequest = (props) => {
  const [currentPage, setCurrentPage] = useState(true);

  // 로그인이 되어 있지 않으면 로그인 페이지로
  if (sessionStorage.getItem('userInfo') === null) {
    return navigate('/login');
  }

  // api 불러오기
  const fetchData = async () => {
    await apiClient.get(`/replace/`);
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
            {currentPage ? <ReplaceRequestList /> : <ReplaceResponseList />}
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

export default ReplaceRequest;
