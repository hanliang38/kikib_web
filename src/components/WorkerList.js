import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import DefaultFont from '../assets/font/agothic14.otf';

const WorkerList = (props) => {
  return (
    <>
      <GlobalStyle />
      <WorkerListComponent>
        <ListHead>
          <ListTitle>성명</ListTitle>
          <ListTitle>상태</ListTitle>
        </ListHead>
        <ListBody>
          <ListElements>
            <ListElement>김기원2</ListElement>
            <ListElement>근무</ListElement>
          </ListElements>
          <ListElements>
            <ListElement>김기원2</ListElement>
            <ListElement>근무</ListElement>
          </ListElements>
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

export default WorkerList;
