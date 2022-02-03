import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import DefaultFont from '../assets/font/agothic14.otf';
import Header from '../components/Header';
// import apiClient from '../config/apiClient';
import WorkerList from '../components/WorkerList';
import OffList from '../components/OffList';

const DailyWorkerNOff = (props) => {
  const [currentPage, setCurrentPage] = useState(true);
  console.log(props);

  return (
    <>
      <GlobalStyle />
      <DailyWorkerNOffPage>
        <Header />
        <PageTitle>{props.title}</PageTitle>
        <TableContainer>
          <Table>
            <TableTitle>가동대수</TableTitle>
            <TableContent>10대</TableContent>
          </Table>
          <Table>
            <TableTitle>근무인원</TableTitle>
            <TableContent>10명</TableContent>
          </Table>
          <Table>
            <TableTitle>휴무인원</TableTitle>
            <TableContent>1명</TableContent>
          </Table>
        </TableContainer>
        <SelectBox>
          <Btn onClick={() => setCurrentPage(true)}>근무인원</Btn>
          <Btn onClick={() => setCurrentPage(false)}>휴무인원</Btn>
        </SelectBox>
        <CurrentPage>{currentPage ? <WorkerList /> : <OffList />}</CurrentPage>
      </DailyWorkerNOffPage>
    </>
  );
};

DailyWorkerNOff.defaultProps = {
  title: '몇월 몇일',
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
  margin: 20px
  width: 100vw;
  height: 100vh;
}

#root {
  margin: 10px;
  width: 100vw;
  height: 100vh;
}
`;

const DailyWorkerNOffPage = styled.div`
  margin-top: 100px;
  margin-bottom: 100px;
  text-align: center;
  height: 100vh;
`;

const PageTitle = styled.h1`
  font-size: 80px;
  font-style: bold;
  padding-bottom: 30px;
`;

const TableContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  font-size: 50px;
`;

const Table = styled.div`
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  margin: 0 10px 0 10px;
`;

const TableTitle = styled.div`
  margin: 0;
  padding: 5px 50px 5px 50px;
  background-color: #007473;
  color: white;
`;

const TableContent = styled.div`
  margin: 0;
  padding: 40px;
  background-color: #efefef;
  color: black;
`;

const SelectBox = styled.div`
  font-size: 50px;
  text-align: center;
  justify-content: space-between;
`;

const Btn = styled.button`
  background-color: white;
  border: none;
  padding: 20px 0;
  width: 45%;
  font-size: 50px;
  font-weight: bold;
  &:focus {
    color: #007473;
    border-bottom: solid 5px;
    border-color: #007473;
  }
  &:active {
    color: #007473;
    border-bottom: solid 5px;
    border-color: #007473;
  }
`;

const CurrentPage = styled.div``;

export default DailyWorkerNOff;
