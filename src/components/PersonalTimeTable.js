import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';
import Clock from 'react-live-clock';
import 'moment/locale/ko';
import { useLocation, Navigate } from 'react-router';
import DefaultFont from '../assets/font/agothic14.otf';
import { device } from './Devices';
import Header from './Header';

const PersonalTimeTable = () => {
  const location = useLocation();
  const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));

  // 세션에 저장된 값이 없는 경우
  if (!userInfo) {
    // return navigate('/login');
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // 있는 경우

  return (
    <>
      <GlobalStyle />
      <PersonalTimeTablePage>
        <Header />
        <PageTitle>배차일보</PageTitle>
        <RouteBusInfo>
          <BusRoute>9-3번 노선</BusRoute>
          <BusNumTime>
            <BusNum>1060차량</BusNum>
            <BusRunTime>06:50~00:13 근무</BusRunTime>
          </BusNumTime>
        </RouteBusInfo>
        <SelectBox>
          <TimeTableBtn>배차일보</TimeTableBtn>
          <RouteBtn>노선도</RouteBtn>
        </SelectBox>
        <CurrentPage>
          <DailyTimeTable>
            <ColunmTitle>
              <ColunmTitleItem>회차</ColunmTitleItem>
              <ColunmTitleItem>출발</ColunmTitleItem>
              <ColunmTitleItem>도착</ColunmTitleItem>
              <ColunmTitleItem>상태</ColunmTitleItem>
            </ColunmTitle>
          </DailyTimeTable>
          <RouteLine></RouteLine>
        </CurrentPage>
      </PersonalTimeTablePage>
    </>
  );
};

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

  @media ${device.desktop} {
    height: 100vh;
    width: 100%;
    background-size: cover;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
  }
  @media ${device.mobileL} {
    height: 100vh;
    width: 100%;
    background-size: cover;
  background-repeat: no-repeat;
  }
}
`;

const PersonalTimeTablePage = styled.div`
  margin-top: 100px;
  margin-bottom: 100px;
  text-align: center;
  height: 100vh;
`;
const PageTitle = styled.h1`
  font-size: 80px;
  font-style: bold;
  padding-bottom: 30px;
`;

const RouteBusInfo = styled.div`
  display: flex;
  text-align: center;
  font-size: 40px;
  padding: 30px;
  justify-content: space-between;
`;
const BusRoute = styled.div`
  display: inline-block;
  font-size: 45px;
  font-style: bold;
  margin-left: 30px;
`;
const BusNumTime = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 40px;
  margin-right: 30px;
  vertical-align: bottom;
`;
const BusNum = styled.span`
  font-size: 40px;
  margin-right: 30px;
`;
const BusRunTime = styled.span`
  font-size: 40px;
`;
const SelectBox = styled.div`
  text-align: center;
  font-size: 40px;
  justify-content: space-between;
`;
const TimeTableBtn = styled.button`
  font-size: 60px;
  font-weight: bold;
  padding: 18px;
  width: 45%;
`;
const RouteBtn = styled.button`
  font-size: 60px;
  font-weight: bold;
  padding: 18px;
  width: 45%;
`;
const CurrentPage = styled.div`
  margin-top: 20px;
  height: 72vh;
  border: solid 2px;
  border-color: red;
`;
const DailyTimeTable = styled.div``;
const ColunmTitle = styled.div`
display: flex;
padding 10px;
justify-contetnt: space-between;
border: solid 2px;
border-color: blue;`;

const ColunmTitleItem = styled.div`
  display: inline-block;
  text-align: center;
  font-size: 50px;
  border: solid 2px;
  border-color: green;
`;

const RouteLine = styled.div``;

export default PersonalTimeTable;
