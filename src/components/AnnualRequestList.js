import React, { useEffect } from 'react';
import styled from 'styled-components';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { GrNext } from 'react-icons/gr';

const AnnualRequestList = ({ reqData }) => {
  console.log(reqData);

  const handleData = () => {
    const reqDatas = [];
    reqData.map((item) => {
      const createDateArr = item.createdAt.split(/[^0-9^]/g);
      const workDateArr = item.reqDriverWorkDate.split('-');
      reqData.push({
        createdAt: createDateArr,
        replaceId: item.replaceId,
        reqDriverName: item.reqDriverName,
        reqDriverWorkDate: workDateArr,
      });
      console.log(reqDatas);
    });
  };

  // useEffect(())

  return (
    <>
      <div>
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
      </div>
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
