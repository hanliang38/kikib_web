import React from 'react';
import styled from 'styled-components';

const RequestForLeave = (props) => {
  return (
    <>
      <LeavePageContainer>
        <Title>
          휴무 신청
          <HelpModal>?</HelpModal>
        </Title>
        <LeaveReqBtn>휴무 신청</LeaveReqBtn>
        <LeaveReqBtn>연차 신청</LeaveReqBtn>
        <LeaveChangeReqBtn>휴무 교환 신청</LeaveChangeReqBtn>
      </LeavePageContainer>
    </>
  );
};

const LeavePageContainer = styled.div`
  border: solid 1.5px #007473;
  border-radius: 3rem;
  font-size: 25px;
  padding: 10px;
`;
const Title = styled.div`
  justify-content: center;
`;
const HelpModal = styled.button`
  margin-left: 10px;
  display: inline-bolck;
  font-size: 25px;
  color: white;
  background-color: #192733;
  width: 29px;
  height: 29px;
  border-radius: 0.5rem;
`;
const LeaveReqBtn = styled.button`
  font-size: 25px;
  border: solid 1.5px #a2a9ad;
  color: #a2a9ad;
  padding: 3px;
  border-radius: 3rem;
  margin: 8px;
  width: 40%;
`;
const LeaveChangeReqBtn = styled.button`
  font-size: 25px;
  border: solid 1.5px #a2a9ad;
  color: #a2a9ad;
  padding: 3px;
  border-radius: 3rem;
  margin: 8px;
  width: 90%;
`;

export default RequestForLeave;
