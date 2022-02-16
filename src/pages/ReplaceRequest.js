import React from 'react';
// import { Link } from 'react-router-dom';
import { useNavigate as navigate } from 'react-router';
import styled, { createGlobalStyle } from 'styled-components';
import DefaultFont from '../assets/font/agothic14.otf';
import Header from '../components/Header';

const ReplaceRequest = (props) => {
  if (sessionStorage.getItem('userInfo') === null) {
    return navigate('/login');
  }

  return (
    <>
      <GlobalStyle />
      <ManagePage>
        <Header />
        <TitleName>
          <h1>내 신청 내역</h1>
        </TitleName>
      </ManagePage>
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
  margin-bottom: 50px;
  text-align: center;
  height: 100vh;
`;
const TitleName = styled.div`
  text-align: center;
  margin-bottom: 30px;
  font-size: 30px;
`;

export default ReplaceRequest;
