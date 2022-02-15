import React, { useState, useLayoutEffect } from 'react';

// import Footer from './Footer';
import { Link } from 'react-router-dom';
import { useNavigate as navigate } from 'react-router';
import styled, { createGlobalStyle } from 'styled-components';
import DefaultFont from '../assets/font/agothic14.otf';
import Header from '../components/Header';
import apiClient from '../config/apiClient';

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
    <div>
      <GlobalStyle />
      {/* <Navbar /> */}
      <ManagePage>
        <Header />
        <TitleName>
          <h1>근무일정관리</h1>
        </TitleName>
        <UserInfo>
          <CompanyBox>
            {businessPlace}
            <br />
            영업소
          </CompanyBox>
          <RouteBox>
            {error ? `?` : busRouteData}번
            <br /> 노선
          </RouteBox>
        </UserInfo>
        <BtnsDiv>
          <BtnDiv>
            <Link to="/schedule">
              <Btn>근무 일정표</Btn>
            </Link>
          </BtnDiv>
          <BtnDiv>
            <Link to="/replaceManage">
              <Btn>휴무 신청 / 교환 현황</Btn>
            </Link>
          </BtnDiv>
          <BtnDiv>
            {/* <Link to="/main"> */}
            <Btn onClick={() => alert('준비중인 기능입니다.')}>
              근무 일정 확인
            </Btn>
            {/* </Link> */}
          </BtnDiv>
          <BtnDiv>
            {/* <Link to="/main"> */}
            <Btn onClick={() => alert('준비중인 기능입니다.')}>
              배차 일보 조회
            </Btn>
            {/* </Link> */}
          </BtnDiv>
        </BtnsDiv>
      </ManagePage>
      {/* <Footer /> */}
    </div>
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

}
`;
const ManagePage = styled.div`
  margin-top: 50px;
  margin-bottom: 100px;
  text-align: center;
  height: 100vh;
`;
const TitleName = styled.div`
  text-align: center;
  margin-bottom: 30px;
  font-size: 30px;
`;
const UserInfo = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  font-size: 20px;
`;
const CompanyBox = styled.div`
  display: table-cell;
  background-color: #192734;
  border: solid;
  border-size: 10px;
  border-color: #e7e6e6;
  border-radius: 1.5rem;
  color: white;
  width: 30%;
  height: 10vh;
  padding: 10px;
  text-align: center;
  vertical-align: middle;
`;
const RouteBox = styled.div`
display:table-cell;
background-color: #017574;
border: solid;
border-size: 3px
border-color: #20928C;
border-radius: 1.5rem;
color: white;
width: 30%;
height: 10vh;
padding: 10px;
text-align:center;
vertical-align:middle;
`;
const BtnsDiv = styled.div`
  text-align: center;
  min-width: 80%;
`;

const BtnDiv = styled.div`
  margin: 3%;
`;

const Btn = styled.button`
  font-size: 30px;
  font-weight: bold;
  width: 85%;
  min-height: 10vh;
  border-style: solid;
  border-width: 1.5px;
  border-color: #c0c0c0;
  border-radius: 1.5rem;
  text-decoration: none;
  color: black;
  &:hover {
    background-color: rgb(173, 170, 170);
  }
`;

export default WorkScheduleManagement;
