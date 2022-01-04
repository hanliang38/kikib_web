import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoLogin from '../assets/Drawables/logo_login.png';
import styled, { createGlobalStyle } from 'styled-components';
import bgLogin from '../assets/Drawables/img_bg_login.png';
import DefaultFont from '../assets/font/agothic14.otf';
import { device } from './Devices';

const Login = () => {
  const [inputId, setId] = useState('');
  const [inputPw, setPw] = useState('');

  const handleId = (e) => {
    setId(e.currentTarget.value);
  };
  const handlePw = (e) => {
    setPw(e.currentTarget.value);
  };

  const onClickLogin = (e) => {
    // console.log('click login');
    console.log('ID : ', inputId);
    console.log('PW : ', inputPw);

    let formData = new FormData();
    formData.append('loginId', inputId);
    formData.append('password', inputPw);

    axios({
      method: 'post',
      url: '/api/login',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        //handle success
        if (res.data.status === 200) {
          const userInfo = res.data.object;
          window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
          console.log(userInfo);
        }
        //서버의 Json형태의 로컬스토리지 우선 저장
        // window.sessionStorage.setItem('userInfo', res);
        // window.sessionStorage.setItem('userInfo', JSON.stringify(res));
        // console.log(
        //   window.localStorage.setItem('userInfo', JSON.stringify(res))
        // );
        // 작업 완료 되면 페이지 이동(새로고침)
        document.location.href = '/main';
      })
      .catch((error) => {
        //handle error
        console.log(error);
      });
    e.preventDefault();
  };

  const onEnter = (e) => {
    if (e.key === 'Enter') {
      onClickLogin();
    }
  };

  return (
    <div>
      <GlobalStyle />
      <LoginForm autoComplete="off" onKeyPress={onEnter}>
        <LoginLogo>
          <Link to="/main">
            <LoginLogoLink src={logoLogin} alt="Logo" />
          </Link>
        </LoginLogo>
        <InputForm>
          <IntArea>
            <InputArea
              type="text"
              value={inputId}
              onChange={handleId}
              required
            />
            <IntLabel htmlFor="id">아이디</IntLabel>
          </IntArea>
          <IntArea>
            <InputArea
              type="password"
              value={inputPw}
              onChange={handlePw}
              required
            />
            <IntLabel htmlFor="id">비밀번호</IntLabel>
          </IntArea>
          <BtnArea>
            <BtnAreaButton onClick={onClickLogin}>
              키키버스 계정으로 로그인
            </BtnAreaButton>
          </BtnArea>
          <LoginInquiry>
            <LoginInquiryP>로그인 문의</LoginInquiryP>
          </LoginInquiry>
        </InputForm>
      </LoginForm>
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
    height: 100vh;
    width: 100%;
    overflow: hidden;
    background: url(${bgLogin});
    
    background-repeat: no-repeat;
    @media ${device.laptop} {
      background-size: cover;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
    }
    @media ${device.desktop} {
      background-size: cover;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
    }
    @media ${device.mobileL} {
      background-size: cover;
    background-repeat: no-repeat;
    }
  }
`;

// let LoginPage = styled.div`
//   height: 100vh;
// `;

let LoginForm = styled.section`
  display: inline-block;
  vertical-aline: middle;
  position: relative;
  z-index: 2;

  @media ${device.laptop} {
    max-width: 500px;
    padding: 0;
  }
  @media ${device.desktop} {
    width: 60vh;
    margin: 10vh;
    padding: 0vh;
  }
  @media ${device.mobileL} {
    vertical-align: middle
    margin-bottom: 500px;
    padding: 0;
    heigth: 700px;
  }
`;

let LoginLogo = styled.div`
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  @media ${device.laptop} {
    size: 32px;
  }
  @media ${device.desktop} {
    size: 32px;
  }
  @media ${device.mobileL} {
    max-width: 500px;
    height: 350px;
  }
  &a {
    @media ${device.laptop} {
      size: 32px;
    }
    @media ${device.desktop} {
      size: 32px;
    }
    @media ${device.mobileL} {
      max-width: 500px;
      height: 350px;
    }
  }
`;

let LoginLogoLink = styled.img`
  display: inline-block;
  @media ${device.laptop} {
  }
  @media ${device.desktop} {
  }
  @media ${device.mobileL} {
    width: 500px;
    height: 300px;
  }
`;

let InputForm = styled.form``;

let IntArea = styled.div`
  min-width: 250px;
  position: relative;
  margin-top: 20px;
  :first-child {
    margin-top: 0;
  }
`;
let InputArea = styled.input`
  width: 100%;
  padding: 20px 10px 10px;
  background-color: transparent;
  border: none;
  border-bottom: 1.5px solid #999;
  font-size: 18px;
  color: #fff;
  outline: none;
  &:focus + label,
  &:valid + label {
    top: -2px;
    font-size: 13px;
    color: #fff;
  }
`;
let IntLabel = styled.label`
  position: absolute;
  left: 10px;
  top: 15px;
  font-size: 18px;
  color: #fff;
  transition: all 0.5s ease;
`;
let BtnArea = styled.div`
  margin-top: 30px;
`;

let BtnAreaButton = styled.button`
  width: 100%;
  min-width: 250px;
  height: 50px;
  background: linear-gradient(0.25turn, #39aea1, #76bd72, #80bfb5);
  color: #fff;
  font-size: 20px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  position: relative;
  &:hover {
    background: #999;
  }
`;

let LoginInquiry = styled.div`
  width: 100%;
  min-width: 250px;
  margin-top: 20px;
  text-align: center;
  font-size: 15px;
  color: #fff;
  position: relative;
  &:hover {
    color: orange;
  }
`;

let LoginInquiryP = styled.p`
  cursor: pointer;
  text-decoration: none;
`;

export default Login;
