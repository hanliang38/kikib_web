import React from 'react';
import Footer from './Footer';

const Main = () => {
  return (
    <div>
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
          <button>운행관리</button>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
