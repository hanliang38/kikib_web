import React from 'react';
import { useLocation } from 'react-router-dom';
import apiClient from '../../config/apiClient';
import '../../css/modal.css';

const AnnualReqModal = (props) => {
  const { open, close } = props;
  const location = useLocation();
  // 현재 선택한 날짜
  const dateArr = location.state.date.split('-');
  const selectDate = `${dateArr[1]}월 ${dateArr[2]}일`;

  // 연차 신청하고 싶은 날의 workId
  const workData = location.state.workList;
  const reqDriverWorkId = workData
    .filter((item) => item.date === location.state.date)
    .map((item) => item.id);
  // console.log('reqDriverWorkId::', reqDriverWorkId[0]);

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

  // 요청
  const onSubmitFetchData = async () => {
    try {
      await apiClient
        .post(`/replace/annual?workId=${reqDriverWorkId[0]}`)
        .then((res) => {
          if (res.status === 200) {
            alert('연차신청이 완료 되었습니다.');
            close();
          }
        });
    } catch (e) {
      alert('이미 요청중이거나 요청이 불가합니다.');
      close();
    }
  };

  return (
    <>
      <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
          <section>
            <main>
              <div>
                {selectDate}에 <br />
                연차를 신청하시겠습니까?
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

export default AnnualReqModal;
