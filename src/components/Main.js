import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.js';
import Footer from './Footer.js';

const today = new Date();
let week = new Array(
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일'
);
let days = today.getDate();
let todayLabel = week[today];

let month = ('0' + (today.getMonth() + 1)).slice(-2);
let day = ('0' + today.getDate()).slice(-2);

const Main = () => {
  return (
    <div>
      <Header />
      <div className="user_name">
        <h1>
          {/*username*/} {/*bus_num*/}번 승무원님
        </h1>
      </div>
      <div className="date_time_weather">
        <span>
          {}월 {}일 {}요일
        </span>
        <span></span>
        <span></span>
      </div>
      <div className="buttons">
        <p>
          <button>근무일정관리</button>
        </p>
        <p>
          <button>
            운행관리
            <Link>http://kiki-bus.com:8080/api/driver</Link>
          </button>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
