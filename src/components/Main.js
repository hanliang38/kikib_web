import React from 'react';
import Navbar from './Navigationbar';
import Footer from './Footer';
import '../css/Main.css';
import { Link } from 'react-router-dom';

const today = new Date();
let week = ['일', '월', '화', '수', '목', '금', '토'];
let days = today.getDay();
let todayLabel = week[days];
let month = ('0' + (today.getMonth() + 1)).slice(-2);
let day = ('0' + today.getDate()).slice(-2);
let hours = today.getHours();
let ampm = hours <= 12 ? 'AM' : 'PM';
if (hours >= 12) {
  hours = hours - 12;
}
let minutes = today.getMinutes();

const Main = () => {
  return (
    <div>
      <Navbar />
      <div className="main-page">
        <div className="user_name">
          <h1>
            {/*username*/} {/*bus_num*/}번 승무원님
            {console.log('지금은 메인')}
          </h1>
        </div>
        <div className="date_time_weather">
          <span>
            {month}월 {day}일 {todayLabel}요일
          </span>
          <span>
            {ampm} {hours}:{minutes}
          </span>
          <span></span>
        </div>
        <div className="buttons">
          <div className="btn">
            <button>
              <Link to="/management">근무일정관리</Link>
            </button>
          </div>
          <div className="btn">
            <button
              onClick={() =>
                window.open('http://kiki-bus.com:8080/api/driver', '_blank')
              }
            >
              <Link to="/main">운행관리</Link>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
