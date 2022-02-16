import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import DefaultFont from '../assets/font/agothic14.otf';

const WorkerList = ({ workerRows }) => {
  const [workerDataObj, setWorkerDataObj] = useState();

  useEffect(() => {
    fetchData();
  }, [workerRows]);

  const fetchData = () => {
    const workDataRows = workerRows;
    setWorkerDataObj(workDataRows);
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
          {workerDataObj &&
            workerDataObj.map((row, i) => (
              <ListElements key={`workList-${i}`}>
                <ListElement>{row.name}</ListElement>
                <ListElement>{row.status}</ListElement>
              </ListElements>
            ))}
        </ListBody>
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
  border-bottom: solid 2px black;
  width: 95%;
`;

const ListTitle = styled.div`
  width: 30%;
  font-size: 20px;
  padding: 10px 0 15px;
`;

const ListBody = styled.div`
  margin: 0;
`;

const ListElements = styled.div`
  display: flex;
  justify-content: start-flex;
  top: 0;
  margin: 10px auto;
  width: 95%;
  border-radius: 3rem;
  background-color: #efefef;
`;

const ListElement = styled.p`
  width: 30%;
  font-size: 20px;
  padding: 15px 0;
`;

export default WorkerList;
