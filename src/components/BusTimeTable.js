import React, { useEffect, useState } from 'react';
import 'moment/locale/ko';
import DefaultFont from '../assets/font/agothic14.otf';
import { styled as materialStyled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import apiClient from '../config/apiClient';
import { cleanup } from '@testing-library/react';
// import useInterval from './useInterval';

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
  // const [currentDate, setCurrentDate] = useState(currentYMD);
  const [dataRow, setDataRow] = useState([]);
  // const [delay, setDelay] = useState(1000);
  // const [busStatusValue, setBusStatusValue] = useState([]);

  // 전체 데이터를 보여주는 effect
  useEffect(() => {
    fetchData(currentYMD);
    // console.log(statusBus);
    cleanup();
  }, []);

  // useEffect(() => {
  //   useInterval(() => {
  //     busStatusValue;
  //   }, delay);
  // }, [busStatusValue, delay]);

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

  // useInterval(() => {
  //   set;
  // });

  const fetchData = async () => {
    try {
      setError(null);

      // api 데이터 추출
      const response = await apiClient.get(`/dispatch/driver/${currentYMD}`);
      let res = response.data.object;
      console.log('res::', res);

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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">회차</StyledTableCell>
              <StyledTableCell align="center">출발</StyledTableCell>
              <StyledTableCell align="center">도착</StyledTableCell>
              <StyledTableCell align="center">상태</StyledTableCell>
            </TableRow>
          </TableHead>
          {dataRow ? (
            <TableBody>
              {rows.map((row, i) =>
                row.status === '운행중' ? (
                  <StyledTableRowIng key={`list1-${i}`}>
                    <StyledTableCellIng
                      align="center"
                      component="th"
                      scope="row"
                    >
                      {row.num}
                    </StyledTableCellIng>
                    <StyledTableCellIng align="center">
                      {row.start}
                    </StyledTableCellIng>
                    <StyledTableCellIng align="center">
                      {row.arrive}
                    </StyledTableCellIng>
                    <StyledTableCellIng align="center">
                      {row.status}
                    </StyledTableCellIng>
                  </StyledTableRowIng>
                ) : row.status === '운행대기' ? (
                  <StyledTableRow key={`list1-${i}`}>
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.num}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.start}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.arrive}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.status}
                    </StyledTableCell>
                  </StyledTableRow>
                ) : (
                  <StyledTableRow key={`list1-${i}`}>
                    <StyledTableCelled
                      align="center"
                      component="th"
                      scope="row"
                    >
                      {row.num}
                    </StyledTableCelled>
                    <StyledTableCelled align="center">
                      {row.start}
                    </StyledTableCelled>
                    <StyledTableCelled align="center">
                      {row.arrive}
                    </StyledTableCelled>
                    <StyledTableCelled align="center">
                      {row.status}
                    </StyledTableCelled>
                  </StyledTableRow>
                )
              )}
            </TableBody>
          ) : (
            <div>배차일보가 없습니다.</div>
          )}
        </Table>
      </TableContainer>
      {error && <div>페이지 에러입니다.</div>}
    </>
  );
};

// 운행대기
const StyledTableCelled = materialStyled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
    height: 80,
    fontSize: 60,
    fontStyle: { DefaultFont },
    borderBottomWidth: 3,
    borderBottomColor: 'black',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 50,
    color: '#7B868C',
  },
}));

// 운행중
const StyledTableCellIng = materialStyled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
    height: 80,
    fontSize: 60,
    fontStyle: { DefaultFont },
    borderBottomWidth: 3,
    borderBottomColor: 'black',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 50,
    color: theme.palette.common.white,
  },
}));

const StyledTableCell = materialStyled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
    height: 80,
    fontSize: 60,
    fontStyle: { DefaultFont },
    borderBottomWidth: 3,
    borderBottomColor: 'black',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 50,
  },
}));

const StyledTableRow = materialStyled(TableRow)(({ theme }) => ({
  backgroundColor: '#EFEFEF',
  borderBottom: 'solid',
  borderBlockEndWidth: 10,
  borderBlockColor: 'white',

  // hide last border
  '&:last-child td, &:last-child th': {
    borderBottom: 0,
  },

  // '&:.MuiTableRow-root css-11toj2m-MuiTableRow-root':{}
}));

// 운행중 row
const StyledTableRowIng = materialStyled(TableRow)(({ theme }) => ({
  backgroundColor: '#007473',
  borderBottom: 'solid',
  borderBlockEndWidth: 10,
  borderBlockColor: 'white',

  // hide last border
  '&:last-child td, &:last-child th': {
    borderBottom: 0,
  },
}));

export default BusTimeTable;
