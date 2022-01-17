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

axios.withCredentials = true;
axios.defaults.withCredentials = true;

const BusTimeTable = () => {
  // Data

  // 에러가 생겼을 때 생기는 로그
  console.log();

  function createData(num, start, arrive, status) {
    return { num, start, arrive, status };
  }

  const rows = [
    createData(1, '06:50', '09:03', '운행완료'),
    createData(2, '09:14', '10:58', '운행완료'),
    createData('', '중식', '권장시간', ''),
    createData(3, '11:51', '14:14', '운행완료'),
    createData(4, '14:33', '16:52', '운행완료'),
    createData('', '석식', '권장시간', ''),
    createData(5, '17:11', '19:35', '운행중'),
    createData(6, '19:44', '21:42', '운행대기'),
    createData(7, '22:17', '00:13', '운행대기'),
  ];

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
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.num}
                </StyledTableCell>
                <StyledTableCell align="center">{row.start}</StyledTableCell>
                <StyledTableCell align="center">{row.arrive}</StyledTableCell>
                <StyledTableCell align="center">{row.status}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const StyledTableCell = materialStyled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    height: 80,
    fontSize: 60,
    fontStyle: { DefaultFont },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 50,
  },
}));

const StyledTableRow = materialStyled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default BusTimeTable;
