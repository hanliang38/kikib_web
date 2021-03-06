import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logoLogin from '../assets/img/logo_login.png';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import '../css/common.css';
import '../css/login.css';

const Login = () => {
  const [inputId, setId] = useState('');
  const [inputPw, setPw] = useState('');
  const [isOpen, showPw] = useState(false); // 비밀번호 초기값 false
  const [isRemember, setIsRemember] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['rememberId']);

  const navigate = useNavigate();

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
    showPw((isOpen) => !isOpen); // on,off boolean
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
        //handle success
        const accessToken = res.data.object.token;
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${accessToken}`;

        if (res.data.status === 200) {
          const userInfo = res.data.object;
          window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
          window.sessionStorage.setItem('token', accessToken);
        }
        // 작업 완료 되면 페이지 이동(새로고침)
        navigate('/main', { replace: true });
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

  return (
    <div className="container login">
      <p className="pagetype">운수사업자용</p>

      <Link to="/main">
        <div className="logo">
          <div className="img-box">
            <img src={logoLogin} alt="kikiB" />
          </div>
          <p>스마트 운수 솔루션</p>
        </div>
      </Link>

      <form autoComplete="off" onKeyPress={onEnter}>
        <div className="input-box">
          <label>
            <input
              type="text"
              value={inputId || ''}
              onChange={handleId}
              required
            />
            <i></i>
            <span className="title">아이디</span>
          </label>
        </div>

        <div className="input-box password">
          <label>
            {/* <!-- .btn-password.on 일 때 type="text"로 변경 --> */}
            <input
              type={isOpen ? 'text' : 'password'}
              value={inputPw || ''}
              onChange={handlePw}
              required
            />
            <i></i>
            <span className="title">비밀번호</span>
            {/* <!-- 토글 .on --> */}
            <span
              className={isOpen ? 'btn-password on' : 'btn-password'}
              onClick={togglePw}
            ></span>
          </label>
        </div>

        <label className="chkbox-box">
          <input
            type="checkbox"
            checked={isRemember}
            onChange={(e) => handleOnRemember(e)}
          />
          <i></i>
          <span>로그인 정보 기억하기</span>
        </label>

        <button type="button" onClick={onClickLogin} className="btn-login">
          로그인하기
        </button>
        <button type="button" className="btn-inquiry">
          로그인 문의
        </button>
      </form>
    </div>
  );
};

export default Login;
