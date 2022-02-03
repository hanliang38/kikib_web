import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import '../css/login.css';
// import styled, { createGlobalStyle } from 'styled-components';
// import { device } from './Devices';
import { useCookies } from 'react-cookie';
// import { useNavigate } from 'react-router-dom';
// import { configs } from '../config/config';

const Login = () => {
  const [inputId, setId] = useState('');
  const [inputPw, setPw] = useState('');
  const [isOpen, showPw] = useState(false); // 비밀번호 초기값 false
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

  // 비밀번호 텍스트
  const togglePw = (e) => {
    showPw(isOpen => !isOpen); // on,off boolean
  }

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

    let formData = new FormData();
    formData.append('loginId', inputId);
    formData.append('password', inputPw);

    axios({
      method: 'post',
      url: 'http://kiki-bus.com:8080/api/login',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        //handle success
        if (res.data.status === 200) {
          const userInfo = res.data.object;
          window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
          // console.log(userInfo);
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
    <>
      <div className="container">
        <span className="pagetype">운수사업자용</span>

        <div className="logo">
          <div className="img-box"><img src={require("../assets/img/logo_login.png").default} alt="KiKiB"/></div>
          <p>스마트 운수 솔루션</p>
        </div>

        <form autoComplete="off" onKeyPress={onEnter}>
          <div className="input-box">
            <label>
              <input type="text" value={inputId || ''} onChange={handleId} required />
              <span className="title">아이디</span>
            </label>
          </div>
          
          <div className="input-box password">
            <label>
              <input type={isOpen ? "test" : "password"} value={inputPw || ''} onChange={handlePw} required />
              <span className="title">비밀번호</span>
              <i className={isOpen ? "on" : null} onClick={togglePw}></i>
            </label>
          </div>

          <label className="chkbox-box"><input type="checkbox" checked={isRemember} onChange={(e) => handleOnRemember(e)} /><i></i>로그인 정보 기억하기</label>

          <button type="button" className="btn-login" onClick={onClickLogin}>로그인하기</button>
          <button type="button" className="btn-inquiry">로그인 문의</button>
        </form>
      </div>
    </>
  );
};

export default Login;