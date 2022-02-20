import React from 'react';
import apiClient from '../../config/apiClient';
import '../../css/modal.css';

const CancelCheck = (props) => {
  const { open, close, replaceId } = props;

  console.log(replaceId);

  const onSubmitFetchData = async () => {
    await apiClient.put(`/replace/${replaceId}/cancel`).then(() => {
      window.location.replace('/annualStatus');
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
                선택하신 연차 신청을
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
                  onSubmitFetchData();
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
