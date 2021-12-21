import React from 'react';
import Navbar from './Navigationbar';
import Footer from './Footer';
import '../css/Main.css';
import { Link } from 'react-router-dom';

// 유저정보 불러오기
// console.log(sessionStorage.getItem('userInfo'));
let userform = sessionStorage.getItem('userInfo');
const user_name = JSON.parse(userform).data.object.name;
// console.log(user_name);
// const driverId = JSON.parse(userform).data.object.userId;

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

// 사용자 위치정보
// let position;
// let currentWeather = position.weather[0].main;
// var imgURL = '../assets/Drawables/icon_weather_' + currentWeather + '.png';
// navigator.geolocation.getCurrentPosition((res) => {
//   // console.log('res: ', res);
//   position = res;
//   // console.log('position:', position.coords.latitude);
//   // 사용자 날씨 가져오기
//   // console.log(position.timestamp);
//   // 사용자 위치정보를 활용한 날씨 가져오기
//   fetch(
//     `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${process.env.WEATHER_API}`
//   )
//     .then((response) => response.json())
//     .then((json) => {
//       console.log(json);
//       position = json;
//     });
//   // console.log(getWeather());
//   // console.log(position.weather[0].main);
// });
// // console.log(position);
// setTimeout(() => {
//   // console.log(position);
//   console.log(position.weather[0].main);
// }, 5000);

// // 날씨 아이콘 가져오기

const Main = () => {
  return (
    <div>
      <Navbar />
      <div className="main-page">
        <div className="user_name">
          <h1>
            {user_name} {/*bus_num*/}9-3번 승무원님
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
          <span>{/* <img src={imgURL} alt="Current Weather icon" /> */}</span>
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
