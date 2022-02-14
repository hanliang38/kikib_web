import React, { useEffect, useState } from 'react';
import logoHeader from '../assets/img/logo_header.png';
import icoSearch from '../assets/img/ico_search.png';
import icoMsg from '../assets/img/ico_msg.png';
import logoBus from '../assets/img/logo_bus.png';
import 'moment/locale/ko';
import { useLocation, Navigate } from 'react-router';
import BusTimeTable from '../components/BusTimeTable';
import RouteTimeTable from '../components/RouteTimeTable';
import apiClient from '../config/apiClient';
import '../css/common.css';
import '../css/personal_timetable.css';

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const nowMonth = month < 10 ? `0${month}` : month;
const date = today.getDate();
const nowDate = date < 10 ? `0${date}` : date;
const currentYMD = `${year}-${nowMonth}-${nowDate}`;

const PersonalTimeTable = () => {
  const [currentPage, setCurrentPage] = useState(true);
  const [routeName, setRouteName] = useState('');
  const [busNumber, setBusNumber] = useState();
  const [timeTableData, setTimeTableData] = useState();
  // const [workingHours, setWorkingHours] = useState('');

  // api 데이터 최초 1회 렌더링 (useEffect(1))
  useEffect(() => {
    fetchData();
  }, []);

  // 로그인 여부
  const location = useLocation();
  const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));

  // 세션에 저장된 값이 없는 경우
  if (!userInfo) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // 있는 경우
  // data
  const fetchData = async () => {
    try {
      await apiClient.get(`/dispatch/driver/${currentYMD}`).then((res) => {
        setTimeTableData(res.data.object);
        next(res.data.object);
      });
    } catch (e) {}
  };

  const next = (data) => {
    if (data.length === 0) {
      return;
    }
    // 노선번호
    setRouteName(data[0].routeName);
    // 차량번호
    setBusNumber(data[0].busNumber);
    // 근무시간
    // const firstStartTime = data[0].startTime;
    // console.log(firstStartTime);
    // const lastEndTime = data[data.length - 1].endTime;
    // console.log(lastEndTime);
    // setWorkingHours(`${firstStartTime}~${lastEndTime}`);
    setTimeTableData(data);
  };

  // console.log(data);

  return (
    <>
      <div className="container timetable">
        <header>
          <div className="logo">
            <a href="/main">
              <img src={logoHeader} alt="kikiB" />
            </a>
          </div>
          <p className="page-title">배차일보</p>
          <div className="btn-box">
            <a href="#!" className="btn-search">
              <img src={icoSearch} alt="검색" />
            </a>
            <a href="#!" className="btn-msg">
              <img src={icoMsg} alt="메시지" />
            </a>
          </div>
        </header>

        {busNumber ? (
          <div className="user-box">
            <div className="logo">
              <img src={logoBus} alt="" />
            </div>
            <h1>
              <span>충훈부</span> {routeName}번 노선{' '}
              <span>{busNumber}차량</span>
            </h1>
          </div>
        ) : (
          <></>
        )}

        <div className="inner">
          <div className="tab-list">
            <a
              href="#!"
              className={currentPage ? 'btn-tab on' : 'btn-tab'}
              onClick={() => setCurrentPage(true)}
            >
              배차일보
            </a>
            <a
              href="#!"
              className={currentPage ? 'btn-tab' : 'btn-tab on'}
              onClick={() => setCurrentPage(false)}
            >
              노선도
            </a>
          </div>
          <div className="current-content">
            {currentPage ? (
              <BusTimeTable timeTableData={timeTableData} />
            ) : (
              <RouteTimeTable busNumber={routeName} />
            )}
          </div>
        </div>

        <nav className="nav">
          <ul className="nav-list">
            <li>
              <a href="#!">
                <span className="blind">홈</span>
              </a>
            </li>
            <li>
              <a href="/management">
                <span className="blind">근무관리</span>
              </a>
            </li>
            <li className="on">
              <a href="#!">
                <span className="blind">배차일보</span>
              </a>
            </li>
            <li>
              <a href="#!">
                <span className="blind">사용자설정</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default PersonalTimeTable;
