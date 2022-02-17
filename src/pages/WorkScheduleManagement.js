import React, { useState, useLayoutEffect } from 'react';
import logoHeader from '../assets/img/logo_header.png';
import icoSearch from '../assets/img/ico_search.png';
import icoMsg from '../assets/img/ico_msg.png';
import icoCs from '../assets/img/ico_cs.png';

// import Footer from './Footer';
// import { Link } from 'react-router-dom';
import { useNavigate as navigate } from 'react-router';
// import styled, { createGlobalStyle } from 'styled-components';
// import DefaultFont from '../assets/font/agothic14.otf';
// import Header from '../components/Header';
import apiClient from '../config/apiClient';
import '../css/common.css';
import '../css/management.css';

const WorkScheduleManagement = (props) => {
  const [busRouteData, setBusRouteData] = useState();
  const [error, setError] = useState(null);
  const [businessPlace, setBusinessPlace] = useState();

  // 유저정보 불러오기
  const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));

  // 있는 경우
  const driverId = userInfo.userId;

  const fetchData = async () => {
    try {
      setError(null);
      await apiClient.get(`/route/driver?driverId=${driverId}`).then((res) => {
        setBusRouteData(res.data.object.name);
        setBusinessPlace(res.data.object.branchName);
      });
    } catch (e) {
      setError(e);
    }
  };

  useLayoutEffect(() => {
    fetchData();
  }, []);

  if (sessionStorage.getItem('userInfo') === null) {
    return navigate('/login');
  }

  return (
    <>
      <div className="container management">
        <header>
          <div className="logo">
            <a href="/main">
              <img src={logoHeader} alt="kikiB" />
            </a>
          </div>
          <p className="page-title">근무일정</p>
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
          <div className="user-box">
            <div className="company">
            <p className="txt01">{businessPlace}<br/>영업소</p>
            </div>

            <div className="bus">
              <p className="txt01">{error ? `?` : busRouteData}번 노선</p>
              <p className="txt02">A조 <strong>홍길동</strong>님<br />1194차량</p>
            </div>

            {/* .on 추가 : 근무일 */}
            <div className="day on"></div>
          </div>

          {/* 
            1. .btn-common 추가
              1) .btn-disabled : 버튼 텍스트 회색 처리, 준비중 추가
              2) .btn-holiday : 휴무신청기간 추가
              
            2. .ico-alarm 추가
              1) .on : 알림아이콘 on
          */}
          <ul className="menu-list">
            <li className="type-cell">
              <a
                href="/schedule"
                className="btn-common btn-holiday"
                component={busRouteData}
              >
                <span className="menu-title">근무<br />일정표</span>

                <div className="icon-box">
                  <i className="ico-alarm"></i>
                  <i className="ico-calendar"></i>
                </div>

                <span className="notify-txt">2월 휴무신청</span>
              </a>
            </li>
            <li className="type-cell">
              <a
                href="/replaceManage"
                className="btn-common"
                // onClick={() => alert('준비중인 기능입니다.')}
              >
                <span className="menu-title">신청<br />현황</span>

                <div className="icon-box">
                  <i className="ico-alarm"></i>
                  <i className="ico-request"></i>
                </div>
              </a>
            </li>
            <li className="type-row chk-day">
              <a href="/main" className="btn-common" onClick={() => alert('준비중인 기능입니다.')}>
                <span className="menu-title">근무일정 확인</span>
                <span className="date">01.31 ~ 02.06</span>

                <div className="icon-box">
                  <i className="ico-alarm on"></i>
                </div>
              </a>
            </li>
            <li className="type-row chk-timetable">
              <a href="/main" className="btn-common" onClick={() => alert('준비중인 기능입니다.')}>
                <span className="menu-title">배차일보 조회</span>
                <span className="date">~ 01.30</span>

                <div className="icon-box">
                  <i className="ico-alarm"></i>
                </div>
              </a>
            </li>
          </ul>
        </div>

        <button className="btn-cs">
          <img src={icoCs} alt="고객센터" />
        </button>

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

    // <div>
    //   <GlobalStyle />
    //   {/* <Navbar /> */}
    //   <ManagePage>
    //     <Header />
    //     <TitleName>
    //       <h1>근무일정관리</h1>
    //     </TitleName>
    //     <UserInfo>
    //       <CompanyBox>
    //         {businessPlace}
    //         <br />
    //         영업소
    //       </CompanyBox>
    //       <RouteBox>
    //         {error ? `?` : busRouteData}번
    //         <br /> 노선
    //       </RouteBox>
    //     </UserInfo>
    //     <BtnsDiv>
    //       <BtnDiv>
    //         <Link to="/schedule">
    //           <Btn>근무 일정표</Btn>
    //         </Link>
    //       </BtnDiv>
    //       <BtnDiv>
    //         <Link to="/replaceManage">
    //           <Btn>휴무 신청 / 교환 현황</Btn>
    //         </Link>
    //       </BtnDiv>
    //       <BtnDiv>
    //         {/* <Link to="/main"> */}
    //         <Btn onClick={() => alert('준비중인 기능입니다.')}>
    //           근무 일정 확인
    //         </Btn>
    //         {/* </Link> */}
    //       </BtnDiv>
    //       <BtnDiv>
    //         {/* <Link to="/main"> */}
    //         <Btn onClick={() => alert('준비중인 기능입니다.')}>
    //           배차 일보 조회
    //         </Btn>
    //         {/* </Link> */}
    //       </BtnDiv>
    //     </BtnsDiv>
    //   </ManagePage>
    //   {/* <Footer /> */}
    // </div>
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

// }
// `;
// const ManagePage = styled.div`
//   margin-top: 50px;
//   margin-bottom: 100px;
//   text-align: center;
//   height: 100vh;
// `;
// const TitleName = styled.div`
//   text-align: center;
//   margin-bottom: 30px;
//   font-size: 30px;
// `;
// const UserInfo = styled.div`
//   margin-top: 30px;
//   margin-bottom: 30px;
//   display: flex;
//   justify-content: center;
//   font-size: 20px;
// `;
// const CompanyBox = styled.div`
//   display: table-cell;
//   background-color: #192734;
//   border: solid;
//   border-size: 10px;
//   border-color: #e7e6e6;
//   border-radius: 1.5rem;
//   color: white;
//   width: 30%;
//   height: 10vh;
//   padding: 10px;
//   text-align: center;
//   vertical-align: middle;
// `;
// const RouteBox = styled.div`
// display:table-cell;
// background-color: #017574;
// border: solid;
// border-size: 3px
// border-color: #20928C;
// border-radius: 1.5rem;
// color: white;
// width: 30%;
// height: 10vh;
// padding: 10px;
// text-align:center;
// vertical-align:middle;
// `;
// const BtnsDiv = styled.div`
//   text-align: center;
//   min-width: 80%;
// `;

// const BtnDiv = styled.div`
//   margin: 3%;
// `;

// const Btn = styled.button`
//   font-size: 30px;
//   font-weight: bold;
//   width: 85%;
//   min-height: 10vh;
//   border-style: solid;
//   border-width: 1.5px;
//   border-color: #c0c0c0;
//   border-radius: 1.5rem;
//   text-decoration: none;
//   color: black;
//   &:hover {
//     background-color: rgb(173, 170, 170);
//   }
// `;

export default WorkScheduleManagement;
