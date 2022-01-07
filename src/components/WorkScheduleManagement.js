import React from 'react';
import company from '../assets/WebDrawable/충훈부영업소.png';
import bus_route from '../assets/WebDrawable/9-3번노선.png';
// import Navbar from './Navigationbar';
// import Footer from './Footer';
import { Link } from 'react-router-dom';
import { useNavigate as navigate } from 'react-router';
import styled, { createGlobalStyle } from 'styled-components';
import DefaultFont from '../assets/font/agothic14.otf';
import { device } from './Devices';
import Header from './Header';

const WorkScheduleManagement = () => {
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
          <span>
            <img src={company} alt="company" height={360} width={340} />
          </span>
          <span>
            <img src={bus_route} alt="bus_route" height={360} width={340} />
          </span>
        </UserInfo>
        <BtnsDiv>
          <BtnDiv>
            <Link to="/schedule">
              <Btn>근무 일정표</Btn>
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
const ManagePage = styled.div`
  margin-top: 100px;
  margin-bottom: 100px;
  text-align: center;
  height: 100vh;
`;
const TitleName = styled.div`
  text-align: center;
  margin-bottom: 50px;
  font-size: 40px;
`;
const UserInfo = styled.div`
  text-align: center;
`;
const BtnsDiv = styled.div`
  text-align: center;
  min-width: 500px;
`;

const BtnDiv = styled.div`
  margin: 100px;
`;

const Btn = styled.button`
  font-size: 70px;
  font-weight: bold;
  min-width: 600px;
  min-height: 200px;
  border-style: solid;
  border-width: 1.5px;
  border-color: #c0c0c0;
  border-radius: 3rem;
  text-decoration: none;
  color: black;
  &:hover {
    background-color: rgb(173, 170, 170);
  }
`;

export default WorkScheduleManagement;
