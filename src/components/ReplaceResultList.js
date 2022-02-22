import React from 'react';
import styled from 'styled-components';

const ReplaceResultList = ({ resultData }) => {
  console.log(resultData);

  return (
    <>
      {resultData ? (
        <div>
          {resultData.map((item, i) => (
            <div key={`annualResultList-${i}`}>
              <LogDiv>
                <LogBox>{`${item.updatedAt[0]}.${item.updatedAt[1]}.${item.updatedAt[2]} ${item.updatedAt[3]}:${item.updatedAt[4]}`}</LogBox>
                <Manager>{'배차관리자(추가예정)'}</Manager>
              </LogDiv>
              <ListBox>
                <TextBox>
                  {item.reqDriverName}
                  <br />
                  {`${item.reqDriverLeaveDate[1]}월 ${item.reqDriverLeaveDate[2]}일`}
                </TextBox>
                <TextBox></TextBox>
                <TextBox>{item.status}</TextBox>
                <TextBox></TextBox>
                <TextBox>
                  {item.resDriverName}
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

export default ReplaceResultList;
