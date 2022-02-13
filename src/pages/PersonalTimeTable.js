import React, { useEffect, useState } from 'react';
import logoHeader from '../assets/img/logo_header.png';
import icoSearch from '../assets/img/ico_search.png';
import icoMsg from '../assets/img/ico_msg.png';
import logoBus from '../assets/img/logo_bus.png';
// import styled, { createGlobalStyle } from 'styled-components';
import 'moment/locale/ko';
import { useLocation, Navigate } from 'react-router';
// import DefaultFont from '../assets/font/agothic14.otf';
// import { device } from '../components/Devices';
// import Header from '../components/Header';
import BusTimeTable from '../components/BusTimeTable';
import RouteTimeTable from '../components/RouteTimeTable';
import apiClient from '../config/apiClient';
import '../css/common.css';
import '../css/personal_timetable.css';

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const nowMonth = month < 10 ? `0${month}` : month;
const date = today.getDate();
const nowDate = date < 10 ? `0${date}` : date;
const currentYMD = `${year}-${nowMonth}-${nowDate}`;

const PersonalTimeTable = () => {
  const [currentPage, setCurrentPage] = useState(true);
  const [error, setError] = useState(null);
  const [routeName, setRouteName] = useState('');
  const [busNumber, setBusNumber] = useState();
  // const [workingHours, setWorkingHours] = useState('');

  // api 데이터 최초 1회 렌더링 (useEffect(1))
  useEffect(() => {
    fetchData();
  }, []);

  // 로그인 여부
  const location = useLocation();
  const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));

  // 세션에 저장된 값이 없는 경우
  if (!userInfo) {
    // return navigate('/login');
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // 있는 경우
  // data
  const fetchData = async () => {
    try {
      setError(null);
      // setCurrentYearMonth(nowYearMonth);
      await apiClient
        .get(`/dispatch/driver/${currentYMD}`)
        .then((res) => next(res.data.object));
      // console.log(response);
      // console.log(res);
    } catch (e) {
      setError(e);
    }
  };

  const next = (data) => {
    if (data.length === 0) {
      return;
    }
    // 노선번호
    setRouteName(data[0].routeName);
    // 차량번호
    setBusNumber(data[0].busNumber);
    // 근무시간
    // const firstStartTime = data[0].startTime;
    // console.log(firstStartTime);
    // const lastEndTime = data[data.length - 1].endTime;
    // console.log(lastEndTime);
    // setWorkingHours(`${firstStartTime}~${lastEndTime}`);
  };

  // console.log(data);

  return (
    <>
    <div className="container timetable">
      {error && <div>에러가 발생했습니다.</div>}

      <header>
        <div className="logo">
          <a href="/main">
            <img src={logoHeader} alt="kikiB" />
          </a>
        </div>
        <p className="page-title">배차일보</p>
        <div className="btn-box">
          <a href="#!" className="btn-search">
            <img src={icoSearch} alt="검색" />
          </a>
          <a href="#!" className="btn-msg">
            <img src={icoMsg} alt="메시지" />
          </a>
        </div>
      </header>

      {busNumber ? (
      <div className="user-box">
        <div className="logo">
          <img src={logoBus} alt="" />
        </div>
        <h1>
          <span>충훈부</span> {routeName}번 노선 <span>{busNumber}차량</span>
        </h1>
      </div>
      ) : (
          <></>
      )}

      <div className="inner">
        <div className="tab-list">
          <a href="#!" className="btn-tab on" onClick={() => setCurrentPage(true)}>
            배차일보
          </a>
          <a href="#!" className="btn-tab" onClick={() => setCurrentPage(false)}>
            노선도
          </a>
        </div>

        <div className="current-content">
          {currentPage ? (
            <BusTimeTable />
          ) : (
            <RouteTimeTable busNumber={routeName} />
          )}
        </div>
      </div>

      <nav className="nav">
        <ul className="nav-list">
          <li>
            <a href="#!">
              <span className="blind">홈</span>
            </a>
          </li>
          <li>
            <a href="/management">
              <span className="blind">근무관리</span>
            </a>
          </li>
          <li className="on">
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

      {/* <GlobalStyle />
      {error && <div>에러가 발생했습니다.</div>}
      <PersonalTimeTablePage>
        <Header />
        <PageTitle>배차일보</PageTitle>
        {busNumber ? (
          <RouteBusInfo>
            <BusRoute>{routeName}번 노선</BusRoute>
            <BusNumTime>
              <BusNum>{busNumber}차량</BusNum>
              <BusRunTime>{workingHours} 근무</BusRunTime>
            </BusNumTime>
          </RouteBusInfo>
        ) : (
          <></>
        )}
        <SelectBox>
          <TimeTableBtn onClick={() => setCurrentPage(true)}>
            배차일보
          </TimeTableBtn>
          <RouteBtn onClick={() => setCurrentPage(false)}>노선도</RouteBtn>
        </SelectBox>
        <CurrentPage>
          {currentPage ? (
            <BusTimeTable />
          ) : (
            <RouteTimeTable busNumber={routeName} />
          )}
        </CurrentPage>
      </PersonalTimeTablePage> */}
    </>
  );
};

// const GlobalStyle = createGlobalStyle`
// @font-face {
//   font-family: 'agothic14';
//   src: url(${DefaultFont});
// }

// *{
//   margin: 0;
//   padding: 0;
//   box-sizing: content-box;
//   }

// body {
//   font-family: agothic14;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin: 20px
//   width: 100vw;
//   height: 100vh;
// }

// #root {
//   margin: 10px;
//   width: 100vw;
//   height: 100vh;

//   @media ${device.desktop} {
//     height: 100vh;
//     width: 100%;
//     background-size: cover;
//     background-size: 100% 100%;
//     background-repeat: no-repeat;
//     background-position: center;
//   }
//   @media ${device.mobileL} {
//     height: 100vh;
//     width: 100%;
//     background-size: cover;
//   background-repeat: no-repeat;
//   }
// }
// `;

// const PersonalTimeTablePage = styled.div`
//   margin-top: 100px;
//   margin-bottom: 100px;
//   text-align: center;
//   height: 100vh;
// `;
// const PageTitle = styled.h1`
//   font-size: 80px;
//   font-style: bold;
//   padding-bottom: 30px;
// `;

// const RouteBusInfo = styled.div`
//   display: flex;
//   text-align: center;
//   font-size: 40px;
//   padding: 30px;
//   justify-content: space-between;
// `;
// const BusRoute = styled.div`
//   display: inline-block;
//   font-size: 45px;
//   font-style: bold;
//   margin-left: 30px;
// `;
// const BusNumTime = styled.div`
//   display: flex;
//   justify-content: space-between;
//   font-size: 40px;
//   margin-right: 30px;
//   vertical-align: bottom;
// `;
// const BusNum = styled.span`
//   font-size: 40px;
//   margin-right: 30px;
// `;
// const BusRunTime = styled.span`
//   font-size: 40px;
// `;
// const SelectBox = styled.div`
//   text-align: center;
//   font-size: 40px;
//   justify-content: space-between;
// `;
// const TimeTableBtn = styled.button`
//   font-size: 60px;
//   font-weight: bold;
//   padding: 18px;
//   width: 45%;
// `;
// const RouteBtn = styled.button`
//   font-size: 60px;
//   font-weight: bold;
//   padding: 18px;
//   width: 45%;
// `;
// const CurrentPage = styled.div`
//   margin-top: 20px;
//   height: 72vh;
// `;

export default PersonalTimeTable;
