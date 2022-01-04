import React from 'react';
import company from '../assets/WebDrawable/충훈부영업소.png';
import bus_route from '../assets/WebDrawable/9-3번노선.png';
import Navbar from './Navigationbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { useNavigate as navigate } from 'react-router';
import styled, { createGlobalStyle } from 'styled-components';

const WorkScheduleManagement = () => {
  if (sessionStorage.getItem('userInfo') === null) {
    return navigate('/login');
  }
  return (
    <div>
      <GlobalStyle />
      <Navbar />
      <ManagePage>
        <TitleName>
          <h1>근무일정관리</h1>
        </TitleName>
        <UserInfo>
          <span>
            <img src={company} alt="company" height={260} width={240} />
          </span>
          <span>
            <img src={bus_route} alt="bus_route" height={260} width={240} />
          </span>
        </UserInfo>
        <BtnsDiv>
          <BtnDiv>
            <Btn>
              <Link to="/schedule">근무 일정표</Link>
            </Btn>
          </BtnDiv>
          <BtnDiv>
            <Btn>
              <Link to="/main">근무 일정 확인</Link>
            </Btn>
          </BtnDiv>
          <BtnDiv>
            <Btn>
              <Link to="/main">배차 일보 조회</Link>
            </Btn>
          </BtnDiv>
        </BtnsDiv>
      </ManagePage>
      <Footer />
    </div>
  );
};

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'agothic14';
  src: url('../assets/font/agothic14.otf');
}

body {
  font-family: agothic14;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
#root {
  margin: 10px;
}
`;
const ManagePage = styled.div`
  margin: 50px;
  min-width: 520px;
`;
const TitleName = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;
const UserInfo = styled.div`
  text-align: center;
`;
const BtnsDiv = styled.div`
  text-align: center;
  min-width: 500px;
`;
const BtnDiv = styled.div`
  margin: 30px;
`;
const Btn = styled.button`
  min-width: 400px;
  min-height: 80px;
  border-style: solid;
  border-width: 1.5px;
  border-color: #c0c0c0;
  border-radius: 1rem;
  &:hover {
    background-color: rgb(173, 170, 170);
  }
  &a {
    text-decoration: none;
    font-weight: bold;
    font-size: 35px;
    color: black;
  }
`;
export default WorkScheduleManagement;
