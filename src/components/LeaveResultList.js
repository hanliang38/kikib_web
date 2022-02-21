import React from 'react';
import styled from 'styled-components';
import { GrNext } from 'react-icons/gr';

const LeaveResultList = ({ resultData }) => {
  console.log(resultData);

  // 승인 반려에 따른 글자색 변경은 css 만들어 주시면 적용하겠습니다.

  return (
    <>
      {resultData ? (
        <div>
          {resultData.map((item, i) => (
            <div key={`annualResultList-${i}`}>
              <LogDiv>
                <LogBox>{`2022-02-21 00:00`}</LogBox>
                <Manager>{'휴무자동화처리'}</Manager>
              </LogDiv>
              <ListBox>
                <TextBox>
                  {item.date.map((item, index) => (index ? ', ' : '') + item)}
                </TextBox>
                <TextBox>{item.status === 'ACCEPT' ? '승인' : '반려'}</TextBox>
                <TextBox>
                  <GrNext color="#A2A9AD" />
                </TextBox>
                <TextBox>
                  휴무신청
                  <br />
                  {item.workDate[1]}월{item.workDate[2]}일
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

const LogDiv = styled.div`
  justify-content: space-between;
`;

const LogBox = styled.div`
  display: inline-block;
  font-size: 13px;
  background-color: #a2a9ad;
  color: white;
  padding: 5px;
  width: 50%;
  text-align: center;
  border-radius: 3rem;
  margin: 5px;
`;

const Manager = styled.div`
  display: inline-block;
  font-size: 13px;
  width: 40%;
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

export default LeaveResultList;
