import React, { useState, useEffect } from 'react';
import icoBack from '../assets/img/ico_back.png';
import icoSearch from '../assets/img/ico_search.png';
import icoMsg from '../assets/img/ico_msg.png';
import WorkerList from '../components/WorkerList';
import OffList from '../components/OffList';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import apiClient from '../config/apiClient';
import '../css/common.css';
import '../css/management.css';

// 높이 고정값 체크
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

// data form set
function createData(name, status) {
  return { name, status };
}

const DailyWorkerAndOff = () => {
  const [currentPage, setCurrentPage] = useState(true);
  const [error, setError] = useState(null);
  const [activeBusCntData, setActiveBusCntData] = useState();
  const [workerRows, setWorkerRows] = useState();
  const [workerCntData, setWorkerCntData] = useState();
  const [offRows, setOffRows] = useState();
  const [offCntData, setOffCntData] = useState();
  const [offList, setOffList] = useState();

  const location = useLocation();
  const date = location.state.date;
  const dateArr = date.split('-');
  const title = `${dateArr[1]}월 ${dateArr[2]}일`;
  const navigate = useNavigate();

  // api 데이터 최초 1회 렌더링 (useEffect(1))
  useEffect(() => {
    busNumData();
    workerData();
    leaveData();
  }, [date]);

  // 로그인 여부
  const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));

  // 세션에 저장된 값이 없는 경우
  if (!userInfo) {
    // return navigate('/login');
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  const busRouteId = window.sessionStorage.getItem('routeId');

  // API 가져오기
  const busNumData = async () => {
    // 가동대수 구하기
    setError(null);
    try {
      await apiClient.get(`/route/${busRouteId}/${date}/unit`).then((res) => {
        let busRouteCnt;
        if (res.data.object === null) {
          busRouteCnt = '입력필요';
        } else {
          busRouteCnt = `${res.data.object}대`;
        }
        // 가동대수 state
        setActiveBusCntData(busRouteCnt);
      });
    } catch {
      setError('가동대수 입력필요');
    }
  };

  const workerData = async () => {
    // 근무자 API 구하기
    await apiClient.get(`/work/${busRouteId}/${date}/work`).then((res) => {
      const WorkerObj = res.data.object;
      setWorkerCntData(`${WorkerObj.length}명`);

      // WorkerList props 로 넘길 dataRows
      const WorkerArr = [];
      WorkerObj.map((item) =>
        item.status === 'WORK' || item.status === 'WORK-CHECK'
          ? WorkerArr.push(createData(item.driverName, '근무'))
          : item.status === 'LEAVE-EARLY'
          ? WorkerArr.push(createData(item.driverName, '중도귀가'))
          : null
      );
      setWorkerRows(WorkerArr);
    });
  };

  const leaveData = async () => {
    // 휴무자 API 구하기
    await apiClient.get(`/work/${busRouteId}/${date}/not-work`).then((res) => {
      const offObj = res.data.object;
      setOffCntData(`${offObj.length}명`);

      // OffList props 로 넘길 dataRows
      const offRows = [];
      offObj.map((item) =>
        item.status === 'LEAVE' || item.status === 'LEAVE-CHECK'
          ? offRows.push(createData(item.driverName, '휴무'))
          : item.status === 'ANNUAL'
          ? offRows.push(createData(item.driverName, '연차'))
          : null
      );
      // console.log(offRows);
      setOffRows(offRows);

      // 휴무교환으로 넘길 휴무자 data
      const offArr = [];
      offObj.map((item) =>
        item.status === 'LEAVE' || item.status === 'LEAVE-CHECK'
          ? offArr.push({
              workId: item.workId,
              driverName: item.driverName,
            })
          : null
      );
      // console.log(offArr);
      setOffList(offArr);
    });

    // // 휴무신청일 API 구하기
    // await apiClient
    //   .get(`/work/${busRouteId}/term?yearMonth=${`현재날짜`}`)
    //   .then((res) => {
    //     let busRouteCnt;
    //     if (res.data.object === null) {
    //       busRouteCnt = '입력필요';
    //     } else {
    //       busRouteCnt = `${res.data.object}대`;
    //     }
    //     // 가동대수 state
    //     setActiveBusCntData(busRouteCnt);
    //   });
  };

  return (
    <>
      <div className="container worker">
        <header>
          <div className="btn-back">
            <button onClick={() => navigate(-1)}>
              <img src={icoBack} alt="뒤로가기" />
            </button>
          </div>
          <p className="page-title">{title}</p>
          <div className="btn-box">
            <a href="#!" className="btn-search">
              <img src={icoSearch} alt="검색" />
            </a>
            <a href="#!" className="btn-msg">
              <img src={icoMsg} alt="메시지" />
            </a>
          </div>
        </header>

        <div className="inner">
          <div className="daily-worker">
            <ul className="worker-num">
              <li>
                <span>가동대수</span>
                <br />
                <strong>{error ? '정보입력필요' : activeBusCntData}</strong>
              </li>
              <li>
                <span>근무인원</span>
                <br />
                <strong>{workerCntData}</strong>
              </li>
              <li>
                <span>휴무인원</span>
                <br />
                <strong>{offCntData}</strong>
              </li>
            </ul>
          </div>

          <div className="worker-wrap">
            <div className="tab-list">
              <a
                href="#!"
                className={currentPage ? 'btn-tab on' : 'btn-tab'}
                onClick={() => {
                  setCurrentPage(true);
                  // navigate('/workerAndOff', {
                  //   state: { offRows: offRows, offList: offList },
                  // });
                }}
              >
                휴무
              </a>
              <a
                href="#!"
                className={currentPage ? 'btn-tab' : 'btn-tab on'}
                onClick={() => {
                  setCurrentPage(false);
                }}
              >
                근무
              </a>
            </div>

            <div className="current-content">
              {currentPage ? (
                <OffList offRows={offRows} offList={offList} />
              ) : (
                <WorkerList workerRows={workerRows} />
              )}
            </div>
          </div>
        </div>

        <nav className="nav">
          <ul className="nav-list">
            <li>
              <a href="/main">
                <span className="blind">홈</span>
              </a>
            </li>
            <li className="on">
              <a href="/management">
                <span className="blind">근무관리</span>
              </a>
            </li>
            <li>
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

export default DailyWorkerAndOff;
