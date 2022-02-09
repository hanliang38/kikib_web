import React, { useState } from 'react';
import styled from 'styled-components';
import InfoModal from './modal/InfoModal';
import LeaveReqModal from './modal/LeaveReqModal';
import AnnualReqModal from './modal/AnnualReqModal';
import LeaveReqReplaceModal from './modal/LeaveReqReplaceModal';

const RequestForLeave = ({ offList }) => {
  const [infoModal, setInfoModal] = useState(false);
  const [leaveRequestModal, setLeaveRequestModal] = useState(false);
  const [annualRequestModal, setAnnualRequestModal] = useState(false);
  const [leaveRequestReplaceModal, setLeaveRequestReplaceModal] =
    useState(false);

  console.log(offList);
  const openHandleInfo = (e) => {
    setInfoModal(true);
  };
  const closeHandleInfo = (e) => {
    setInfoModal(false);
  };

  const openLeaveReq = (e) => {
    setLeaveRequestModal(true);
  };
  const closeLeaveReq = (e) => {
    setLeaveRequestModal(false);
  };
  const openAnnualReq = (e) => {
    setAnnualRequestModal(true);
  };
  const closeAnnualReq = (e) => {
    setAnnualRequestModal(false);
  };

  const openReplace = (e) => {
    setLeaveRequestReplaceModal(true);
  };
  const closeReplace = (e) => {
    setLeaveRequestReplaceModal(false);
  };

  // ****** 휴무 교환 ********
  // 휴무 신청 기간동안 휴무교환이 활성화 되면 안됨
  // 지난 날에 대해 휴무 교환신청이 활성화 되면 안됨
  // 이미 휴무일 일 때 휴무 교환이 활성화 되면 안됨
  // 나의 근무날에만 교환 버튼이 활성화 (같은 조끼리만 교환 가능)

  // ********* 휴무 신청 **********
  //  휴무 신청기간은 이전 날짜에 대해서는 휴무 신청이나 교환이 활성화 되면 안된다.
  // 현재(2월달) 3월달의 휴무신청기간( 2/14~2/20) 이면 => 휴무신청기간동안 3월달의 휴무 교환 신청 불가

  return (
    <>
      <LeavePageContainer>
        <Title>
          휴무 신청
          <HelpModal onClick={openHandleInfo}>?</HelpModal>
          <InfoModal open={infoModal} close={closeHandleInfo} header="도움말">
            도움말 팝업창
          </InfoModal>
        </Title>
        <LeaveReqBtn onClick={openLeaveReq}>휴무 신청</LeaveReqBtn>
        <LeaveReqModal
          open={leaveRequestModal}
          close={closeLeaveReq}
          header="휴무 신청"
        >
          휴무 신청 팝업창
        </LeaveReqModal>
        <LeaveReqBtn onClick={openAnnualReq}>연차 신청</LeaveReqBtn>
        <AnnualReqModal
          open={annualRequestModal}
          close={closeAnnualReq}
          header="연차 신청"
        >
          연차 신청 팝업창
        </AnnualReqModal>
        <LeaveChangeReqBtn onClick={openReplace}>
          휴무 교환 신청
        </LeaveChangeReqBtn>
        <LeaveReqReplaceModal
          open={leaveRequestReplaceModal}
          close={closeReplace}
          header="휴무 교환 신청"
        ></LeaveReqReplaceModal>
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
