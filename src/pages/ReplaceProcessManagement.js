import React from 'react';
// import Footer from './Footer';
import { Link } from 'react-router-dom';
import { useNavigate as navigate } from 'react-router';
import styled, { createGlobalStyle } from 'styled-components';
import DefaultFont from '../assets/font/agothic14.otf';
import Header from '../components/Header';

const ReplaceManagement = (props) => {
  // 로그인이 되어 있지 않으면 로그인 페이지로
  if (sessionStorage.getItem('userInfo') === null) {
    return navigate('/login');
  }

  return (
    <>
      <GlobalStyle />
      <ManagePage>
        <Header />
        <TitleName>
          <h1>휴무 교환 / 처리 내역</h1>
        </TitleName>
        <UserInfo>
          <CompanyBox>
            문의
            <br />
            하기
          </CompanyBox>
        </UserInfo>
        <BtnsDiv>
          <BtnDiv>
            <Link to="/leaveStatus">
              <Btn>휴무 신청내역</Btn>
            </Link>
          </BtnDiv>
          <BtnDiv>
            <Link to="/replaceStatus">
              <Btn>휴무 교환내역</Btn>
            </Link>
          </BtnDiv>
          <BtnDiv>
            <Link to="/annualStatus">
              <Btn>연차 신청내역</Btn>
            </Link>
          </BtnDiv>
          <BtnDiv>
            {/* <Link to="/main"> */}
            <Btn onClick={() => alert('준비중인 기능입니다.')}>
              교환 요청 목록
            </Btn>
            {/* </Link> */}
          </BtnDiv>
        </BtnsDiv>
      </ManagePage>
      {/* <Footer /> */}
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

  background-size: cover;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
}
`;
const ManagePage = styled.div`
  margin-top: 50px;
  margin-bottom: 30px;
  text-align: center;
  height: 100vh;
`;
const TitleName = styled.div`
  text-align: center;
  margin-bottom: 50px;
  font-size: 30px;
`;
const UserInfo = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
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
  width: 25%;
  height: 15%;
  padding: 15px;
  text-align: center;
  vertical-align: middle;
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
  height: 25%;
  padding: 10px;
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

export default ReplaceManagement;
