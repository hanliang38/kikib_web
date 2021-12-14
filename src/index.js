import React from 'react';
import ReactDOM from 'react-dom';
import logo_login from './assets/Drawables/logo_login.png';
import './css/login.css';

ReactDOM.render(
  <>
    <section className="login-form" autoComplete="off">
      <div className="login-logo">
        <img src={logo_login} />
      </div>
      <form>
        <div className="int-area">
          <input type="text" name="id" id="id" required />
          <label htmlFor="id">아이디</label>
        </div>
        <div className="int-area">
          <input type="password" name="id" id="id" required />
          <label htmlFor="id">비밀번호</label>
        </div>
        <div className="btn-area">
          <button>키키버스 계정으로 로그인</button>
        </div>
      </form>
      <div className="caption">
        <a>로그인 문의</a>
      </div>
    </section>
  </>,
  document.getElementById('root')
);
