import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import DefaultFont from '../assets/font/agothic14.otf';
import Header from '../components/Header';
// import apiClient from '../config/apiClient';
import WorkerList from '../components/WorkerList';
import OffList from '../components/OffList';
import { useLocation, Navigate } from 'react-router-dom';
import apiClient from '../config/apiClient';

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
  const dateArr = location.state.date.split('-');
  const title = `${dateArr[1]}월 ${dateArr[2]}일`;
  const date = location.state.date;

  // api 데이터 최초 1회 렌더링 (useEffect(1))
  useEffect(() => {
    fetchData();
  }, []);

  // 로그인 여부
  const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));

  // 세션에 저장된 값이 없는 경우
  if (!userInfo) {
    // return navigate('/login');
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  const busRouteId = window.sessionStorage.getItem('routeId');

  // API 가져오기
  const fetchData = async () => {
    try {
      // 가동대수 구하기
      setError(null);
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

      // 휴무자 API 구하기
      await apiClient
        .get(`/work/${busRouteId}/${date}/not-work`)
        .then((res) => {
          const offObj = res.data.object;
          // console.log('offObj::', offObj);
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
          setOffRows(offRows);

          // 휴무교환으로 넘길 휴무자 data
          offObj.map((item) =>
            item.status === 'LEAVE' || item.status === 'LEAVE-CHECK'
              ? setOffList({ workId: item.workId, driverName: item.driverName })
              : setOffList(null)
          );
        });
    } catch (e) {
      setError(e);
    }
  };

  return (
    <>
      <GlobalStyle />
      <DailyWorkerAndOffPage>
        <Header />
        <PageTitle>{title}</PageTitle>
        <TableContainer>
          <Table>
            <TableTitle>가동대수</TableTitle>
            <TableContent>
              {error ? '정보가 없습니다' : activeBusCntData}
            </TableContent>
          </Table>
          <Table>
            <TableTitle>근무인원</TableTitle>
            <TableContent>
              {error ? '정보가 없습니다' : workerCntData}
            </TableContent>
          </Table>
          <Table>
            <TableTitle>휴무인원</TableTitle>
            <TableContent>
              {error ? '정보가 없습니다' : offCntData}
            </TableContent>
          </Table>
        </TableContainer>
        <SelectBox>
          <WorkBtn onClick={() => setCurrentPage(true)}>근무인원</WorkBtn>
          <OffBtn onClick={() => setCurrentPage(false)}>휴무인원</OffBtn>
        </SelectBox>
        {error ? (
          <>정보없음</>
        ) : (
          <CurrentPage>
            {currentPage ? (
              <WorkerList workerRows={workerRows} />
            ) : (
              <OffList offRows={offRows} offList={offList} />
            )}
          </CurrentPage>
        )}
      </DailyWorkerAndOffPage>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'agothic14';
  src: url(${DefaultFont});
}

*{
  margin: 0;
  padding: 0;
  box-sizing: content-box;
  }

body {
  font-family: agothic14;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px
  width: 100vw;
  height: 100vh;
}

#root {
  margin: 10px;
  width: 100vw;
  height: 100vh;
}
`;

const DailyWorkerAndOffPage = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  text-align: center;
  height: 100vh;
`;

const PageTitle = styled.h1`
  font-size: 30px;
  font-style: bold;
  padding-bottom: 10px;
`;

const TableContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  font-size: 20px;
`;

const Table = styled.div`
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  margin: 0 5px 0 5px;
`;

const TableTitle = styled.div`
  margin: 0;
  padding: 5px 5px 5px 5px;
  background-color: #007473;
  color: white;
`;

const TableContent = styled.div`
  margin: 0;
  padding: 20px 33px;
  background-color: #efefef;
  color: black;
`;

const SelectBox = styled.div`
  font-size: 20px;
  text-align: center;
  justify-content: space-between;
`;

const WorkBtn = styled.button`
  background-color: white;
  border: none;
  padding: 20px 0 5px;
  width: 45%;
  font-size: 25px;
  font-weight: bold;
  &:focus {
    color: #007473;
    border-bottom: solid 2px;
    border-color: #007473;
  }
  &:active {
    color: #007473;
    border-bottom: solid 2px;
    border-color: #007473;
  }
`;
const OffBtn = styled.button`
  background-color: white;
  border: none;
  padding: 20px 0 5px;
  width: 45%;
  font-size: 25px;
  font-weight: bold;
  &:focus {
    color: #007473;
    border-bottom: solid 2px;
    border-color: #007473;
  }
  &:active {
    color: #007473;
    border-bottom: solid 2px;
    border-color: #007473;
  }
`;

const CurrentPage = styled.div``;

export default DailyWorkerAndOff;
