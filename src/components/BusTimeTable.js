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
console.log('아침시작::', new Date(bfastStart));
console.log('아침끝::', new Date(bfastEnd));
// 중식 (UnixTime) (10:00 ~ 13:00)
const lunchStart = today.setHours(10, 0, 0);
const lunchEnd = today.setHours(13, 0, 0);
console.log('lunchStart::', lunchStart);
console.log('점심시작::', new Date(lunchStart));
console.log('lunchEnd::', lunchEnd);
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
  const [currentDate, setCurrentDate] = useState(currentYMD);
  const [dataRow, setDataRow] = useState([]);
  const [statusBus, setStatusBus] = useState('');
  const [runTimes, setRunTimes] = useState([]);
  const [breakTime, setBreakTime] = useState([]);

  // 전체 데이터를 보여주는 effect
  useEffect(() => {
    fetchData(currentDate);
    cleanup();
  }, []);

  // 승무원 운행시간 데이터
  function createData(num, start, arrive, status) {
    return { num, start, arrive, status };
  }

  // const rows = [
  //   createData('', '조식', '권장시간', ''),
  //   createData(1, '06:50', '09:03', '운행완료'),
  //   createData(2, '09:14', '10:58', '운행완료'),
  //   createData('', '중식', '권장시간', ''),
  //   createData(3, '11:51', '14:14', '운행완료'),
  //   createData(4, '14:33', '16:52', '운행완료'),
  //   createData('', '석식', '권장시간', ''),
  //   createData(5, '17:11', '19:35', '운행중'),
  //   createData(6, '19:44', '21:42', '운행대기'),
  //   createData(7, '22:17', '00:13', '운행대기'),
  // ];

  const rows = [];
  dataRow.map((item) => {
    // createData
    return rows.push(createData(item[0], item[1], item[2], item[3]));
  });
  // console.log(typeof breakTime);
  // console.log(runTimes);
  // console.log(breakTime.indexOf(Math.max(...breakTime)));
  // 조. 중. 석 시간 데이터
  // mealTimeData
  // 조식 ()
  // runTimes
  //   .filter((cur) => {
  //     return bfastStart <= cur[1] <= bfastEnd;
  //   })
  //   .filter((item) => item[breakTime.indexOf(Math.max(...breakTime))])
  //   .map((item) => {
  //     return rows.splice(item + 1, 0, createData('', '조식', '권장시간', ''));
  //   });
  // runTimes.filter((cur) => {
  //   // 중식
  //   if (lunchStart <= cur[1] <= lunchEnd) {
  //     const lunchTimeIdx = breakTime.indexOf(Math.max(...breakTime));
  //     return rows.splice(
  //       lunchTimeIdx + 2,
  //       0,
  //       createData('', '중식', '권장시간', '')
  //     );
  //   }
  // });
  // runTimes.filter((cur) => {
  //   // 석식
  //   if (dinnerStart <= cur[1] <= dinnerEnd) {
  //     const dinnerTimeIdx = breakTime.indexOf(Math.max(...breakTime));
  //     return rows.splice(
  //       dinnerTimeIdx + 3,
  //       0,
  //       createData('', '석식', '권장시간', '')
  //     );
  //   }
  // });

  // console.log(rows);

  const fetchData = async (dateString = '') => {
    try {
      setError(null);
      // api 데이터 추출
      const response = await apiClient.get(`/dispatch/driver/${dateString}`);
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
      // 휴식 시간
      const busBreakTime = res.map((item) => {
        return item.breakTime;
      });
      // console.log('busBreakTime::', busBreakTime);
      setBreakTime(busBreakTime);
      // 유닉스 시간
      const unixRunTimes = [];
      //
      const busUnixStartTime = res.map((item) => {
        return item.unixStartTime * 1000;
      });
      // console.log(busUnixStartTime);

      const busUnixEndTime = res.map((item) => {
        return item.unixEndTime * 1000;
      });
      // console.log(busUnixEndTime);

      busUnixStartTime.map((itemx, i) =>
        unixRunTimes.push(itemx, busUnixEndTime[i])
      );
      const unixRunTimesData = division(unixRunTimes, 2);
      // console.log(typeof unixRunTimesData);
      setRunTimes(unixRunTimesData);

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
        // console.log('breakTime::', breakTime);

        const unixJsEndTime = unixEndTime * 1000;
        // console.log(
        //   busRound,
        //   '유닉스시간::',
        //   unixJsEndTime,
        //   'end::',
        //   1642998611822,
        //   unixJsEndTime - 1642998611822
        // );
        // console.log('도착시간::');
        // console.log('bfastStart', bfastStart);
        // console.log(
        //   busRound,
        //   'unixJsEndTime <= lunchEnd && unixJsEndTime >= lunchStart',
        //   unixJsEndTime <= lunchEnd && unixJsEndTime >= lunchStart
        // );

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

      console.log('bFastArr', bFastArr);
      console.log('lunchArr', lunchArr);
      console.log('dinnerArr', dinnerArr);
      // // 조식
      if (0 < bFastArr.length) {
        const maxBreakTime = Math.max(
          ...bFastArr.map((item) => item.breakTime)
        );

        const index = bFastArr.findIndex(
          (item) => item.breakTime >= maxBreakTime
        );

        console.log('##조식 index 구하기', index);

        bFastArr.splice(index, 0, createData('', '조식', '권장시간', ''));
      }

      // 중식
      if (0 < lunchArr.length) {
        const maxBreakTime = Math.max(
          ...lunchArr.map((item) => item.breakTime)
        );
        console.log('maxBreakTime::', maxBreakTime);
        const index = lunchArr.findIndex(
          (item) => item.breakTime >= maxBreakTime
        );

        console.log('##중식 index 구하기', index);

        lunchArr.splice(index, 0, createData('', '중식', '권장시간', ''));

        console.log(lunchArr);
      }

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
      setStatusBus();

      // console.log('rowArr::', rowArr);
      setDataRow(rowArr);
    } catch (e) {
      setError(e);
    }
  };

  // .

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
          {error && <div>잘못된 정보입니다.</div>}
          {dataRow ? (
            <TableBody>
              {rows.map((row, i) => (
                <StyledTableRow key={`list1-${i}`}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {dataRow ? row.num : row.empty}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {dataRow ? row.start : row.meal}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {dataRow ? row.arrive : row.recomand}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {dataRow ? row.status : row.place}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          ) : (
            <div>배차일보가 없습니다.</div>
          )}
        </Table>
      </TableContainer>
    </>
  );
};

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
  // '&:nth-of-type(odd)': {
  //   backgroundColor: theme.palette.action.hover,
  // },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },

  // '&:.MuiTableRow-root css-11toj2m-MuiTableRow-root':{}
}));

export default BusTimeTable;
