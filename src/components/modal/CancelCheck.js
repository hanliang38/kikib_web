import React from 'react';
import apiClient from '../../config/apiClient';
import '../../css/modal.css';

const CancelCheck = (props) => {
  const { open, close, replaceId, dayOffId, status } = props;
  // const replaceId = props.replaceId;

  // console.log(replaceId);

  const DeleteAnnualReqData = async () => {
    await apiClient.put(`/replace/${replaceId}/cancel`).then(() => {
      window.location.replace('/annualStatus');
    });
  };

  const DeleteLeaveReqData = async () => {
    await apiClient
      .delete(`/driver/leave/request?dayOffId=${dayOffId}`)
      .then(() => {
        window.location.replace('/leaveStatus');
      });
  };

  // style
  const submitBtn = {
    background: '#007473',
    color: 'white',
    display: 'inline-block',
    margin: '10px',
  };

  const closeBtn = {
    color: 'black',
    background: '#efefef',
    border: 'solid 3px #a2a9ad',
    display: 'inline-block',
    margin: '10px',
  };

  return (
    <>
      <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
          <section>
            <main>
              <div>
                선택하신 {status}을
                <br /> 취소하시겠습니까?
                <br />
                <br /> 확인 시 목록에서 삭제됩니다.
              </div>
              <button className="close" onClick={close} style={closeBtn}>
                취소
              </button>
              <button
                style={submitBtn}
                onClick={() => {
                  status === '휴무 신청'
                    ? DeleteLeaveReqData()
                    : DeleteAnnualReqData();
                }}
              >
                확인
              </button>
            </main>
          </section>
        ) : null}
      </div>
    </>
  );
};

export default CancelCheck;
