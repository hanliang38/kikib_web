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
      onClickLogin();
    }
  };

  return (
    <div>
      <div className="login-page">
        <section className="login-form" autoComplete="off" onKeyPress={onEnter}>
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
