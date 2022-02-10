import React from 'react';
import '../../css/modal.css';

const LeaveReplaceCheckModal = (props) => {
  const { close } = props;
  const handleRefresh = () => {
    window.location.replace('/workerAndOff');
  };

  return (
    <>
      <main>
        <div>
          휴무교환은
          <br /> 휴무교환대상 승무원이
          <br /> 신청 현황 {'>'} 교환 요청 목록
          <br /> 에서 합의를 해야
          <br /> 관리자에게 신청됩니다.
          <br /> 신청 현황 {'>'} 휴무 교환내역
          <br /> 에서 꼭 확인해주세요.
        </div>
        <button
          onClick={() => {
            close();
            handleRefresh();
          }}
        >
          확인
        </button>
      </main>
    </>
  );
};

export default LeaveReplaceCheckModal;
