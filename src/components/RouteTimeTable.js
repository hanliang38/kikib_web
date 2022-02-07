import React from 'react';
import styled from 'styled-components';

function RouteTimeTable({ busNumber }) {
  const data = require('../assets/GyeonggiBusData/businfo.json');
  const routeData = data[busNumber];
  // console.log(routeData);
  const routeStationData = routeData.stnList;

  return (
    <>
      <TableContainer>
        <TableHead>
          <TableCell>
            <HeadTitle>기점</HeadTitle>
            <HeadContent>{routeData.info.startStationName}</HeadContent>
          </TableCell>
          <TableCell>
            <HeadTitle>종점</HeadTitle>
            <HeadContent>{routeData.info.endStationName}</HeadContent>
          </TableCell>
        </TableHead>
        <TableBoby>
          {routeStationData.map((row, i) => (
            <TableRow key={`stationList-${i}`}>{row.stationName}</TableRow>
          ))}
        </TableBoby>
      </TableContainer>
    </>
  );
}

const TableContainer = styled.div`
  text-align: center;
  height: 100vh;
`;
const TableHead = styled.div`
  width: 100%;
  height: 10%;
  font-size: 5vw;
`;
const TableCell = styled.div`
  display: inline-block;
  width: 50%;
`;
const HeadTitle = styled.div`
  display: inline-block;
  margin-right: 10px;
  color: #7b868c;
`;
const HeadContent = styled.div`
  display: inline-block;
  color: black;
`;
const TableBoby = styled.div``;
const TableRow = styled.div`
  width: 100%;
  font-size: 5vw;
`;

export default RouteTimeTable;
