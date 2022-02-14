import React, { useEffect, useState } from 'react';
import 'moment/locale/ko';
import icoUpdate from '../assets/img/ico_update.png';
// import DefaultFont from '../assets/font/agothic14.otf';
// import { styled as materialStyled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import apiClient from '../config/apiClient';
// import { cleanup } from '@testing-library/react';

axios.withCredentials = true;
axios.defaults.withCredentials = true;

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const nowMonth = month < 10 ? `0${month}` : month;
const date = today.getDate();
const nowDate = date < 10 ? `0${date}` : date;

const currentYMD = `${year}-${nowMonth}-${nowDate}`;
const currentUnixTime = today.getTime();
// console.log(currentUnixTime);
// setInterval(BusTimeTable(), 60 * 1000);

// 조식 (UnixTime) (4:30 ~ 7:00)
const bfastStart = today.setMinutes(270, 0); // 4:30
const bfastEnd = today.setHours(7, 0, 0); // 7:00
// 중식 (UnixTime) (10:00 ~ 13:00)
const lunchStart = today.setHours(10, 0, 0);
const lunchEnd = today.setHours(13, 0, 0);
// 석식 (UnixTime) (15:30 ~ 19:00)
const dinnerStart = today.setHours(15, 0, 0);
const dinnerEnd = today.setHours(19, 0, 0);

// 배열 원하는 만큼 나누는 함수
const division = (arr, size) => {
  let i,
    j,
    temparray = [],
    division = size;
  for (i = 0, j = arr.length; i < j; i += division) {
    temparray.push(arr.slice(i, i + division));
  }
  return temparray;
};

const BusTimeTable = () => {
  // Data
  const [error, setError] = useState(null);
  const [dataRow, setDataRow] = useState([]);

  // 전체 데이터를 보여주는 effect
  useEffect(() => {
    fetchData(currentYMD);
    // console.log(statusBus);
  }, []);

  // 승무원 운행시간 데이터
  function createData(num, start, arrive, status) {
    return { num, start, arrive, status };
  }
  // 렌더링되는 rowData
  const rows = [];
  dataRow.map((item) => {
    // createData
    return rows.push(createData(item[0], item[1], item[2], item[3]));
  });

  const fetchData = async () => {
    try {
      setError(null);

      // api 데이터 추출
      const response = await apiClient.get(`/dispatch/driver/${currentYMD}`);
      let res = response.data.object;
      // console.log(res);

      // 버스 회차
      const busRound = res.map((item) => {
        return item.busRound + 1;
      });
      // 버스 출발 시간
      const busStartTime = res.map((item) => {
        return item.startTime;
      });
      // 버스 도착 시간
      const busEndTime = res.map((item) => {
        return item.endTime;
      });

      // 유닉스 버스 출발 시간
      const busUnixStartTime = res.map((item) => {
        return item.unixStartTime * 1000;
      });
      // 유닉스 버스 도착 시간
      const busUnixEndTime = res.map((item) => {
        return item.unixEndTime * 1000;
      });

      // 필요한 data만 순차적으로 담은 배열 (운행시간표)
      const data = [];
      for (let i = 0; i < busRound.length; i++) {
        data.push(busRound[i]);
        data.push(busStartTime[i]);
        data.push(busEndTime[i]);

        // 현재 상태
        const busStatus = () => {
          if (busUnixEndTime[i] < currentUnixTime) {
            return '운행완료';
          } else if (currentUnixTime < busUnixStartTime[i]) {
            return '운행대기';
          } else {
            return '운행중';
          }
        };
        data.push(busStatus());
      }

      // data 4개씩 나누기
      // console.log('data::', data);
      const rowArr = division(data, 4);

      // // data상태 실시간으로 구하기
      // const statusValue = rowArr.map((item) => {
      //   return item[3];
      // });

      // setBusStatusValue(statusValue);

      // 조, 중, 석 끼워넣기 : {} 형식으로 해당값에 splice
      const bFastArr = [];
      const lunchArr = [];
      const dinnerArr = [];

      function mealData(busRound, breakTime, unixEndTime) {
        return {
          busRound: busRound,
          breakTime: breakTime,
          unixEndTime: unixEndTime,
        };
      }

      res.forEach((item) => {
        // 시간이 조식에 포함되는지
        const { busRound, breakTime, unixEndTime } = item;
        // unixEndTime을 js 시간 규칙에 맞게 재조정
        const unixJsEndTime = unixEndTime * 1000;

        // 조식 (4:30 ~ 7:00)
        if (bfastStart <= unixJsEndTime && unixJsEndTime <= bfastEnd) {
          bFastArr.push(mealData(busRound, breakTime, unixEndTime));
          // 중식
        } else if (lunchStart <= unixJsEndTime && unixJsEndTime <= lunchEnd) {
          lunchArr.push(mealData(busRound, breakTime, unixEndTime));
          // 석식
        } else if (dinnerStart <= unixJsEndTime && unixJsEndTime <= dinnerEnd) {
          dinnerArr.push(mealData(busRound, breakTime, unixEndTime));
        }
      });

      // console.log('bFastArr', bFastArr);
      // console.log('lunchArr', lunchArr);
      // console.log('dinnerArr', dinnerArr);

      // // 조식
      if (0 < bFastArr.length) {
        const maxBreakTime = Math.max(
          ...bFastArr.map((item) => item.breakTime)
        );
        const index =
          res.findIndex((item) => item.breakTime === maxBreakTime) + 1;

        // console.log('## 조식 index 구하기', index);

        rowArr.splice(index, 0, ['', '조식', '권장시간', '']);
      }

      // 중식
      if (0 < lunchArr.length) {
        const maxBreakTime = Math.max(
          ...lunchArr.map((item) => item.breakTime)
        );
        const index =
          res.findIndex((item) => item.breakTime === maxBreakTime) + 1;

        // 조식이 있을 경우
        0 < bFastArr.length
          ? rowArr.splice(index + 1, 0, ['', '중식', '권장시간', ''])
          : rowArr.splice(index, 0, ['', '중식', '권장시간', '']);
        // console.log('## 중식 index 구하기', index);
      }

      // 석식
      if (0 < dinnerArr.length) {
        const maxBreakTime = Math.max(
          ...dinnerArr.map((item) => item.breakTime)
        );
        // console.log('석식 maxBr::', maxBreakTime);
        const index =
          res.findIndex((item) => item.breakTime === maxBreakTime) + 1;

        // // 조식 중식이 있을 경우
        0 < bFastArr.length
          ? rowArr.splice(index + 2, 0, ['', '석식', '권장시간', ''])
          : 0 < lunchArr.length
          ? rowArr.splice(index + 1, 0, ['', '석식', '권장시간', ''])
          : rowArr.splice(index, 0, ['', '석식', '권장시간', '']);
        // console.log('## 석식 index 구하기', index);
      }

      // console.log('rowArr::', rowArr);
      setDataRow(rowArr);
    } catch (e) {
      setError(e);
    }
  };

  return (
    <>
      <div className="timetable-box" component={Paper}>
        <div className="table-head">
          <span>회차</span>
          <span>출발</span>
          <span>도착</span>
          <span>상태</span>
        </div>

        {dataRow ? (
          <div className="table-body">
            {rows.map((row, i) =>
              row.arrive === '권장시간' ? (
                <div className="status status-meal" key={`list1-${i}`}>
                  <span>{`${row.start} ${row.arrive}`}</span>
                </div>
              ) : row.status === '운행중' ? (
                <div className="status status-ing" key={`list1-${i}`}>
                  <span>{row.num}</span>
                  <span>{row.start}</span>
                  <span>{row.arrive}</span>
                  <span>{row.status}</span>
                </div>
              ) : row.status === '운행대기' ? (
                <div className="status status-end" key={`list1-${i}`}>
                  <span>{row.num}</span>
                  <span>{row.start}</span>
                  <span>{row.arrive}</span>
                  <span>{row.status}</span>
                </div>
              ) : (
                <div className="status status-wait" key={`list1-${i}`}>
                  <span>{row.num}</span>
                  <span>{row.start}</span>
                  <span>{row.arrive}</span>
                  <span>{row.status}</span>
                </div>
              )
            )}
          </div>
        ) : (
          <p className="bus-none">배차일보가 없습니다.</p>
        )}
      </div>
      {error && <div className="bus-none">배차일보가 없습니다.</div>}

      {/* 회전효과 : 클릭 시 .on 클래스 추가, 1초 뒤 on 클래스 제거 필요 */}
      <button className="btn-update">
        <img src={icoUpdate} alt="새로고침" />
      </button>
    </>
  );
};

export default BusTimeTable;
