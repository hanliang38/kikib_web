import React from 'react';
import Navbar from './Navigationbar';
import Footer from './Footer';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';
import Clock from 'react-live-clock';
import 'moment/locale/ko';
import { useLocation, Navigate } from 'react-router';

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
  // const navigate = useNavigate();
  const location = useLocation();

  // 유저정보 불러오기
  // console.log(sessionStorage.getItem('userInfo'));
  const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));

  // 세션에 저장된 값이 없는 경우
  if (!userInfo) {
    // return navigate('/login');
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // 있는 경우
  const userName = userInfo.name;

  // console.log(userName);
  // const driverId = JSON.parse(userform).data.object.userId;
  return (
    <div>
      <GlobalStyle />
      <Navbar />
      <MainPage>
        <UserName>
          <h1>
            {userName} {/*bus_num*/}9-3번 승무원님
            {console.log('지금은 메인')}
          </h1>
        </UserName>
        <div className="date_time_weather">
          <Clock
            format={'MM월 DD일 dddd'}
            ticking={true}
            timezone={'Asia/Seoul'}
          />
          <Clock format={'A hh:mm'} ticking={true} timezone={'Asia/Seoul'} />
          <span></span>
          {/* <span><img src={imgURL} alt="Current Weather icon" /></span> */}
        </div>
        <BtnsDiv>
          <BtnDiv>
            <Btn>
              <Link to="/management">근무일정관리</Link>
            </Btn>
          </BtnDiv>
          <BtnDiv>
            <Btn
              onClick={() =>
                window.open('http://kiki-bus.com:8080/api/driver', '_blank')
              }
            >
              <Link to="/main">운행관리</Link>
            </Btn>
          </BtnDiv>
        </BtnsDiv>
      </MainPage>
      <Footer />
    </div>
  );
};

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'agothic14';
  src: url('../assets/font/agothic14.otf');
}

body {
  font-family: agothic14;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

#root {
  margin: 10px;
}
`;
const MainPage = styled.div`
  margin: 50px;
`;

const UserName = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const BtnsDiv = styled.div`
  text-align: center;
  min-width: 500px;
`;

const BtnDiv = styled.div`
  margin: 30px;
`;

const Btn = styled.button`
  min-width: 400px;
  min-height: 80px;
  border-style: solid;
  border-width: 1.5px;
  border-color: #c0c0c0;
  border-radius: 1rem;
  &:hover {
    background-color: rgb(173, 170, 170);
  }
  &a {
    text-decoration: none;
    font-weight: bold;
    font-size: 35px;
    color: black;
  }
`;

export default Main;
