import axios from 'axios';
import React, { useEffect, useState } from 'react';
import logo_login from '../assets/Drawables/logo_login.png';
import '../css/Login.css';

const Login = () => {
  const [loginId, setId] = useState('');
  const [userPw, setPw] = useState('');

  const handleId = (e) => {
    setId(e.currentTarget.value);
  };
  const handlePw = (e) => {
    setPw(e.currentTarget.value);
  };

  const onClickLogin = () => {
    console.log('click login');
    console.log('ID: ', loginId);
    console.log('PW: ', userPw);

    axios
      .post('/api/Login', null, {
        params: {
          loginId: loginId,
          password: userPw,
        },
      })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        // console.log('res.data.loginId :: ', res.data.loginId);
        // console.log('res.data.userPw :: ', res.data.userPw);
        if (res.data.loginId === undefined) {
          // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
          // console.log('======================', res.data.msg);
          alert('입력하신 아이디가 일치하지 않습니다.');
        } else if (res.data.loginId === null) {
          // id는 있지만, pw 는 다른 경우 loginId = null , msg = undefined
          // console.log(
          //   '======================',
          //   '입력하신 비밀번호가 일치하지 않습니다.'
          // );
          alert('입력하신 비밀번호가 일치하지 않습니다.');
        } else if (res.data.loginId === loginId) {
          // id, pw 모두 일치 loginId = loginId1, msg = undefined
          console.log('======================', '로그인 성공');
          sessionStorage.setItem('user_id', loginId);
        }
        // 작업 완료되면 페이지 이동(새로고침)
        document.location.href = '/';
      })
      .catch();
  };

  useEffect(() => {
    axios
      .get('/api/login')
      .then((res) => console.log(res))
      .catch();
  }, []);

  return (
    <div>
      <section className="login-form" autoComplete="off">
        <div className="login-logo">
          <img src={logo_login} />
        </div>
        <form>
          <div className="int-area">
            <input
              type="text"
              name="id"
              id="id"
              value={loginId}
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
              value={userPw}
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
        </form>
        <div className="caption">
          <a>로그인 문의</a>
        </div>
      </section>
    </div>
  );
};

export default Login;
