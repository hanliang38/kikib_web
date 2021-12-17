import React from 'react';
import company from '../assets/WebDrawable/충훈부영업소.png';
import bus_route from '../assets/WebDrawable/9-3번노선.png';
import Navbar from './Navbar';
import Footer from './Footer';

const WorkScheduleManagement = () => {
  return (
    <div>
      <Navbar />
      <div>
        <div className="title_name">
          <h1>근무일정관리</h1>
        </div>
        <div className="user_inform">
          <span>
            <img src={company} alt="company" />
          </span>
          <span>
            <img src={bus_route} alt="bus_route" />
          </span>
        </div>
        <div className="buttons">
          <p>
            <button>근무 일정표</button>
          </p>
          <p>
            <button>근무 일정 확인</button>
          </p>
          <p>
            <button>배차 일보 조회</button>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WorkScheduleManagement;
