import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo_login from '../assets/Drawables/logo_login.png';
import '../css/login.css';

axios.withCredentials = true;

axios.defaults.withCredentials = true;

const Login = () => {
  const [inputId, setId] = useState('');
  const [inputPw, setPw] = useState('');

  const handleId = (e) => {
    setId(e.currentTarget.value);
  };
  const handlePw = (e) => {
    setPw(e.currentTarget.value);
  };

  const onClickLogin = () => {
    console.log('click login');
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
        console.log(res);
        // 작업 완료 되면 페이지 이동(새로고침)
        document.location.href = '/main';
      })
      .catch((res) => {
        //handle error
        console.log(res);
      });
  };

  return (
    <div>
      <div className="login-page">
        <section className="login-form" autoComplete="off">
          <div className="login-logo">
            <Link to="/main">
              <img src={logo_login} alt="Logo" />
            </Link>
          </div>
          <form>
            <div className="int-area">
              <input
                type="text"
                name="id"
                id="id"
                value={inputId}
                onChange={handleId}
                required
              />
              <label htmlFor="id">아이디</label>
            </div>
            <div className="int-area">
              <input
                type="password"
                name="id"
                id="id"
                value={inputPw}
                onChange={handlePw}
                required
              />
              <label htmlFor="id">비밀번호</label>
            </div>
            <div className="btn-area">
              <button type="button" onClick={onClickLogin}>
                키키버스 계정으로 로그인
              </button>
            </div>
            <div className="caption">
              <p>로그인 문의</p>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;
