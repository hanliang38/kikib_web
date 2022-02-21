import React from 'react';
import styled from 'styled-components';
import { GrNext } from 'react-icons/gr';

const AnnualResultList = ({ resultData }) => {
  console.log(resultData);

  return (
    <>
      {resultData ? (
        <div>
          {resultData.map((item, i) => (
            <div key={`annualResultList-${i}`}>
              <LogBox>{`${item.updatedAt[0]}.${item.updatedAt[1]}.${item.updatedAt[2]} ${item.updatedAt[3]}:${item.updatedAt[4]}`}</LogBox>
              <ListBox>
                <TextBox>{item.reqDriverName}</TextBox>
                <TextBox>
                  {item.managerStatus === 'ACCEPT' ? '승인' : '반려'}
                </TextBox>
                <TextBox>
                  <GrNext color="#A2A9AD" />
                </TextBox>
                <TextBox>
                  연차신청
                  <br />
                  {item.reqDriverWorkDate[1]}월{item.reqDriverWorkDate[2]}일
                </TextBox>
              </ListBox>
            </div>
          ))}
        </div>
      ) : (
        <>데이터가 없습니다.</>
      )}
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

export default AnnualResultList;