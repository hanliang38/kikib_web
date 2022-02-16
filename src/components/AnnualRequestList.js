import React from 'react';
import styled from 'styled-components';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { GrNext } from 'react-icons/gr';

const AnnualRequestList = (props) => {
  return (
    <>
      <LogBox>2021.12.18 00:00</LogBox>
      <ListBox>
        <TextBox>홍길동</TextBox>
        <TextBox>승인대기</TextBox>
        <TextBox>
          <GrNext color="#A2A9AD" />
        </TextBox>
        <TextBox>
          연차신청
          <br />
          01월24일
        </TextBox>
        <TextBox>
          <MdOutlineDeleteForever size="30" color="#A2A9AD" />
        </TextBox>
      </ListBox>
    </>
  );
};

const LogBox = styled.div`
  font-size: 13px;
  background-color: #a2a9ad;
  color: white;
  padding: 5px;
  width: 50%;
  text-align: center;
  border-radius: 3rem;
  margin: 5px;
`;

const ListBox = styled.div`
  font-size: 18px;
  background-color: #efefef;
  padding: 10px;
  width: 100%;
  text-align: center;
  border-radius: 1.5rem;
  border: 2px solid white;
`;

const TextBox = styled.div`
  display: inline-block;
  margin: 0 8px;
  text-align: center;
  vertical-align: middle;
`;

export default AnnualRequestList;
