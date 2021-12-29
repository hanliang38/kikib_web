import React from 'react';
import company from '../assets/WebDrawable/충훈부영업소.png';
import bus_route from '../assets/WebDrawable/9-3번노선.png';
import Navbar from './Navigationbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import '../css/WorkScheduleManagement.css';
import { useNavigate as navigate } from 'react-router';

const WorkScheduleManagement = () => {
  if (sessionStorage.getItem('userInfo') === null) {
    return navigate('/');
  }
  return (
    <div>
      <Navbar />
      <div className="manage-page">
        <div className="title-name">
          <h1>근무일정관리</h1>
        </div>
        <div className="user-info">
          <span>
            <img src={company} alt="company" height={260} width={240} />
          </span>
          <span>
            <img src={bus_route} alt="bus_route" height={260} width={240} />
          </span>
        </div>
        <div className="buttons">
          <div className="btn">
            <button>
              <Link to="/schedule">근무 일정표</Link>
            </button>
          </div>
          <div className="btn">
            <button>
              <Link to="/main">근무 일정 확인</Link>
            </button>
          </div>
          <div className="btn">
            <button>
              <Link to="/main">배차 일보 조회</Link>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WorkScheduleManagement;
