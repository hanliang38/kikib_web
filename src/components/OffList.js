import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import DefaultFont from '../assets/font/agothic14.otf';
import RequestForLeave from './RequestForLeave';

const WorkerList = (props) => {
  const [offDataObj, setOffDataObj] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const offDataRows = props.odata;
    setOffDataObj(offDataRows);
  };

  return (
    <>
      <GlobalStyle />
      <WorkerListComponent>
        <ListHead>
          <ListTitle>성명</ListTitle>
          <ListTitle>상태</ListTitle>
        </ListHead>
        <ListBody>
          {offDataObj &&
            offDataObj.map((row, i) => (
              <ListElements key={`offList-${i}`}>
                <ListElement>{row.name}</ListElement>
                <ListElement>{row.status}</ListElement>
                <EtcSetting>···</EtcSetting>
              </ListElements>
            ))}
        </ListBody>
        <RequestForLeave />
      </WorkerListComponent>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'agothic14';
  src: url(${DefaultFont});
}
`;
const WorkerListComponent = styled.div`
  margin: 0 20px 30px;
`;

const ListHead = styled.div`
  position: relative;
  display: flex;
  justify-content: start-flex;
  top: 0;
  margin: 0 auto;
  border-bottom: solid 5px black;
  width: 95%;
`;

const ListTitle = styled.div`
  width: 30%;
  font-size: 50px;
  padding: 15px 0 15px;
`;

const ListBody = styled.div`
  margin: 0;
`;

const ListElements = styled.div`
  display: flex;
  justify-content: start-flex;
  top: 0;
  margin: 15px auto;
  width: 95%;
  border-radius: 3rem;
  background-color: #efefef;
`;

const ListElement = styled.p`
  width: 30%;
  font-size: 40px;
  padding: 30px 0;
`;

const EtcSetting = styled.button`
  margin: auto 10px auto auto;
  width: 25%;
  font-size: 60px;
  font-weight: bolder;
  background-color: none;
  border: none;
  float: right;
  &:hover {
    color: #007473;
  }
`;
export default WorkerList;
