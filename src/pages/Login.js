import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logoLogin from '../assets/Drawables/logo_login.png';
import styled, { createGlobalStyle } from 'styled-components';
import bgLogin from '../assets/Drawables/img_bg_login.png';
import DefaultFont from '../assets/font/agothic14.otf';
import { device } from '../components/Devices';
import { useCookies } from 'react-cookie';
// import { useNavigate } from 'react-router-dom';
// import { configs } from '../config/config';

const Login = () => {
  const [inputId, setId] = useState('');
  const [inputPw, setPw] = useState('');
  const [isRemember, setIsRemember] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['rememberId']);

  useEffect(() => {
    if (cookies.rememberId !== undefined) {
      setId(cookies.rememberId);
      setIsRemember(true);
    }
  }, [cookies]);

  const handleId = (e) => {
    setId(e.currentTarget.value);
  };
  const handlePw = (e) => {
    setPw(e.currentTarget.value);
  };

  const handleOnRemember = (e) => {
    setIsRemember(e.target.checked);
    if (e.target.checked) {
      setCookie('rememberId', inputId);
    } else {
      removeCookie('rememberId');
    }
  };

  // const navigate = useNavigate();

  const onClickLogin = (e) => {
    e.preventDefault();
    // console.log('click login');
    // console.log('ID : ', inputId);
    // console.log('PW : ', inputPw);

    axios({
      method: 'POST',
      url: '/auth/login',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        loginId: inputId,
        password: inputPw,
      },
    })
      .then((res) => {
        console.log(res);
        // console.log(res.data.object.token);
        //handle success
        const accessToken = res.data.object.token;
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${accessToken}`;

        console.log(axios.defaults.headers.common);

        if (res.data.status === 200) {
          const userInfo = res.data.object;
          window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
          window.sessionStorage.setItem('token', accessToken);
          // console.log(userInfo);
        }
        // 작업 완료 되면 페이지 이동(새로고침)
        document.location.href = '/main';
      })
      .catch((error) => {
        //handle error
        console.log(error);
      });
  };

  const onEnter = (e) => {
    if (e.key === 'Enter') {
      onClickLogin(e);
    }
  };

  // var size = {
  //   width: window.innerWidth || document.body.clientWidth,
  //   height: window.innerHeight || document.body.clientHeight,
  // };
  // console.log(size);

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
              value={inputId || ''}
              onChange={handleId}
              required
            />
            <IntLabel htmlFor="id">아이디</IntLabel>
          </IntArea>
          <IntArea>
            <InputArea
              type="password"
              value={inputPw || ''}
              onChange={handlePw}
              required
            />
            <IntLabel htmlFor="id">비밀번호</IntLabel>
          </IntArea>
          <RememberIdLabel>
            <RemeberIdCheckbox
              type="checkbox"
              checked={isRemember}
              onChange={(e) => handleOnRemember(e)}
            />
            ID 저장하기
          </RememberIdLabel>
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

// ${size.desktop}
// ${size.laptopL}
// ${size.laptop}
// ${size.tablet}
// ${size.mobileL}
// ${size.mobileM}
// ${size.mobileS}

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
    overflow: hidden;
    background: url(${bgLogin});cd
    
    background-repeat: no-repeat;

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

// const LoginPage = styled.div`
//   height: 100vh;
// `;

const LoginForm = styled.section`
  display: inline-block;
  vertical-aline: middle;
  position: relative;
  z-index: 2;
  
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

// 로고 폼 공간 조절
const LoginLogo = styled.div`
  text-align: center;
  margin-left: auto;
  margin-right: auto;

  @media ${device.desktop} {
    width: 400px;
    height: 200px;
    margin-bottom: 60px;
    padding-bottom: 40px;
  }
  @media ${device.mobileL} {
    margin-bottom: 60px;
    width: 500px;
    height: 300px;
  }
`;

// 로고크기조절
const LoginLogoLink = styled.img`
  display: inline-block;
  @media ${device.desktop} {
    width: 300px;
    height: 200px;
  }
  @media ${device.mobileL} {
    width: 500px;
    height: 300px;
  }
`;

// 로그인 폼 전체 크기
const InputForm = styled.form`
  @media ${device.desktop} {
    min-width: 300px;
    min-height: 250px;
    margin-top: 30px;
  }
  @media ${device.mobileM} {
    width: 500px;
    height: 400px;
    margin-top: 50px;
  }
`;

const IntArea = styled.div`
  min-width: 300px;
  position: relative;
  margin-top: 60px;
  margin-bottom: 20px;
  :first-child {
    margin-top: 80px;
  }
`;
const InputArea = styled.input`
  width: 100%;
  height: 80px;
  text-transform: lowercase;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #999;
  font-size: 30px;
  color: #fff;
  outline: none;
  &:focus + label,
  &:valid + label {
    top: -2px;
    font-size: 25px;
    color: #fff;
  }

  @media ${device.desktop} {
    font-size: 30px;
    padding: 15px 8px 8px;
  }
  @media ${device.mobileM} {
    font-size: 50px;
    padding: 20px 10px 10px;
  }
`;

const IntLabel = styled.label`
  position: absolute;
  color: #fff;
  transition: all 0.5s ease;
  text-transform: lowercase;

  @media ${device.desktop} {
    font-size: 28px
    left: 10px;
    top: 15px;
  }
  @media ${device.mobileM} {
    font-size: 40px;
    left: 15px;
    top: 30px;
  }
`;

const RememberIdLabel = styled.label`
  position: relative;
  padding: 20px;
  color: white;
  font-size: 30px;
`;

const RemeberIdCheckbox = styled.input`
  position: relative;
  margin-right: 20px;
  transform: scale(2);
`;

const BtnArea = styled.div`
  @media ${device.desktop} {
    margin-top: 30px;
  }
  @media ${device.mobileM} {
    margin-top: 80px;
  }
`;

const BtnAreaButton = styled.button`
  width: 100%;
  min-width: 250px;
  background: linear-gradient(0.25turn, #39aea1, #76bd72, #80bfb5);
  color: #fff;
  font-size: 35px;
  border: none;
  border-radius: 3rem;
  cursor: pointer;
  position: relative;
  &:hover {
    background: #999;
  }

  @media ${device.desktop} {
    margin-top: 20px;
    height: 80px;
  }
  @media ${device.mobileM} {
    margin-top: 30px;
    height: 80px;
  }
`;

const LoginInquiry = styled.div`
  width: 100%;
  margin-top: 50px;
  min-width: 250px;
  text-align: center;
  font-size: 30px;
  color: #fff;
  position: relative;
  &:hover {
    color: orange;
  }

  @media ${device.desktop} {
  }
  @media ${device.mobileM} {
  }
`;

const LoginInquiryP = styled.p`
  cursor: pointer;
  text-decoration: none;
`;

export default Login;
