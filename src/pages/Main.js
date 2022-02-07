import React, { useState, useLayoutEffect } from 'react';
import logoHeader from '../assets/img/logo_header.png';
import icoSearch from '../assets/img/ico_search.png';
import icoMsg from '../assets/img/ico_msg.png';
import logoBus from '../assets/img/logo_bus.png';
import Clock from 'react-live-clock';
import 'moment/locale/ko';
import { useLocation, Navigate } from 'react-router';
import apiClient from '../config/apiClient';
import '../css/common.css';
import '../css/main.css';

const Main = () => {
  const [busRouteData, setBusRouteData] = useState();

  const location = useLocation();

  // 유저정보 불러오기
  const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));

  // 있는 경우
  const userName = userInfo.name;
  const driverId = userInfo.userId;

  const fetchData = async () => {
    try {
      await apiClient.get(`/route/driver?driverId=${driverId}`).then((res) => {
        // session에 routeId 저장
        if (res.data.object !== null) {
          const routeId = res.data.object.id;
          window.sessionStorage.setItem('routeId', routeId);
        }
        setBusRouteData(res.data.object.name);
      });
    } catch (e) {}
  };

  useLayoutEffect(() => {
    fetchData();
  }, []);

  // 세션에 저장된 값이 없는 경우
  if (!userInfo) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <>
      <div className="container main">
        <header>
          <div className="logo">
            <a href="/main">
              <img src={logoHeader} alt="kikiB" />
            </a>
          </div>
          <p className="page-title">메인화면</p>
          <div className="btn-box">
            <a href="#!" className="btn-search">
              <img src={icoSearch} alt="검색" />
            </a>
            <a href="#!" className="btn-msg">
              <img src={icoMsg} alt="메시지" />
            </a>
          </div>
        </header>

        <div className="user-box">
          {/* <h1>{userName} {error ? `?` : busRouteData}번 승무원님</h1> //디자인 버스번호 없어서 주석처리 */}
          <div className="logo">
            <img src={logoBus} alt="" />
          </div>
          <h1>
            <span>삼영운수</span>&nbsp;{userName}님
          </h1>
          <a href="#!" className="btn-timetable">
            출근부
          </a>
        </div>

        <div className="inner">
          <div className="daily-box">
            <div className="box-inner">
              <div className="item date">
                <Clock
                  className="first"
                  format={'MM월DD일'}
                  ticking={true}
                  timezone={'Asia/Seoul'}
                />
                <Clock
                  className="second"
                  format={'dddd'}
                  ticking={true}
                  timezone={'Asia/Seoul'}
                />
              </div>
              <div className="item clock">
                <Clock
                  className="first"
                  format={'A'}
                  ticking={true}
                  timezone={'Asia/Seoul'}
                  locale="en"
                />
                <Clock
                  className="second"
                  format={'hh:mm'}
                  ticking={true}
                  timezone={'Asia/Seoul'}
                />
              </div>
              <div className="item weather ico-weather01">-3°C</div>
            </div>
          </div>

          {/* 
            1. .btn-common에 추가
              1) .btn-disabled : 버튼 텍스트 회색 처리, 준비중 추가
              2) .btn-holiday : 휴무신청기간 추가
          */}
          <ul className="menu-list">
            <li className="type-cell">
              <a
                href="/management"
                className="btn-common"
                component={busRouteData}
              >
                <span className="menu-title">
                  근무
                  <br />
                  일정
                </span>

                <div className="icon-box">
                  <i className="ico-alarm on"></i>
                  <i className="ico-calendar"></i>
                </div>
              </a>
            </li>
            <li className="type-cell">
              <a
                href="/personalTimeTable"
                className="btn-common"
                // onClick={() => alert('준비중인 기능입니다.')}
              >
                <span className="menu-title">
                  배차
                  <br />
                  일보
                </span>

                <div className="icon-box">
                  <i className="ico-alarm"></i>
                  <i className="ico-bus-run"></i>
                </div>
              </a>
            </li>
            <li className="type-cell">
              <a
                href="#!"
                className="btn-common btn-disabled"
                onClick={(e) => e.preventDefault}
              >
                <span className="menu-title">
                  차량
                  <br />
                  관리
                </span>

                <div className="icon-box">
                  <i className="ico-update"></i>
                  <i className="ico-bus-admin"></i>
                </div>
              </a>
            </li>
            <li className="type-cell">
              <a
                href="#!"
                className="btn-common btn-disabled"
                onClick={(e) => e.preventDefault}
              >
                <span className="menu-title">
                  운행
                  <br />
                  분석
                </span>

                <div className="icon-box">
                  <i className="ico-alarm"></i>
                  <i className="ico-analysis"></i>
                </div>
              </a>
            </li>
            <li className="type-row">
              <a href="#!" className="btn-common btn-disabled">
                <span className="menu-title">공지사항</span>

                <div className="icon-box">
                  <i className="ico-alarm"></i>
                  <i className="ico-notice"></i>
                </div>
              </a>
            </li>
            <li className="type-row">
              <a
                href="#!"
                className="btn-common btn-disabled"
                onClick={(e) => e.preventDefault}
              >
                <span className="menu-title">분실물 관리</span>

                <div className="icon-box">
                  <i className="ico-update"></i>
                  <i className="ico-lost-item"></i>
                </div>
              </a>
            </li>
          </ul>
        </div>

        <nav className="nav">
          <ul className="nav-list">
            <li className="on">
              <a href="#!">
                <span className="blind">홈</span>
              </a>
            </li>
            <li>
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

// 기존 소스
// <GlobalStyle />
// <MainPage>
//   <UserName>
//     <h1>
//       {userName} {error ? `?` : busRouteData}번 승무원님
//     </h1>
//   </UserName>
//   <DateTimeWeather>
//     <Daily>
//       <Clock
//         format={'MM/DD dddd'}
//         ticking={true}
//         timezone={'Asia/Seoul'}
//       />
//     </Daily>
//     <Daily>
//       <Clock format={'A hh:mm'} ticking={true} timezone={'Asia/Seoul'} />
//     </Daily>
//     <span><img src={imgURL} alt="Current Weather icon" /></span>
//   </DateTimeWeather>
//   <BtnsDiv>
//     <BtnDiv>
//       <Link to="/management" component={busRouteData}>
//         <Btn>근무일정관리</Btn>
//       </Link>
//     </BtnDiv>
//     <BtnDiv>
//       <Link to="/personalTimeTable">
//       <Btn onClick={() => alert('준비중인 기능입니다.')}>
//         배차일보조회
//       </Btn>
//       </Link>
//     </BtnDiv>
//   </BtnsDiv>
//   <QrBtnDiv>
//     <QrBtn>관리자 문의하기</QrBtn>
//   </QrBtnDiv>
// </MainPage>

export default Main;
