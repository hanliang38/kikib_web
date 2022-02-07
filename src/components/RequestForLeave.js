import React, { useState } from 'react';
import styled from 'styled-components';
import InfoModal from './modal/InfoModal';
import LeaveReqModal from './modal/LeaveReqModal';
import AnnualReqModal from './modal/AnnualReqModal';
import LeaveReqReplaceModal from './modal/LeaveReqReplaceModal';

const RequestForLeave = (props) => {
  const [infoModal, setInfoModal] = useState(false);
  const [leaveRequestModal, setLeaveRequestModal] = useState(false);
  const [annualRequestModal, setAnnualRequestModal] = useState(false);
  const [leaveRequestReplaceModal, setLeaveRequestReplaceModal] =
    useState(false);

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
        >
          휴무 교환 신청 팝업창
        </LeaveReqReplaceModal>
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
