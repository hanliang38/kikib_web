import React from 'react';
import '../../css/modal.css';
import { useLocation } from 'react-router-dom';

const LeaveReqModal = (props) => {
  const { open, close } = props;
  const location = useLocation();
  // 현재 선택한 날짜
  const dateArr = location.state.date.split('-');
  const selectDate = `${dateArr[1]}월 ${dateArr[2]}일`;

  return (
    <>
      <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
          <section>
            <main>
              <h1>
                휴무 신청 기간 <br /> {`0000년 00월`}
              </h1>
              <h2>00월 00일 - 00월 00일</h2>
              <br />
              <div>
                <h2>휴무 신청일</h2>
                <p>{selectDate}</p>
              </div>
              <br />
              <div>
                <p>변경할 기존 휴무일</p>
                <p>(중복 선택 가능)</p>
              </div>
              <br />
              <div>{`캐러셀 공간`}</div>
              <br />
              <div>휴무일을 선택해주세요.</div>
              <button className="close" onClick={close}>
                취소
              </button>
              <button>확인</button>
            </main>
          </section>
        ) : null}
      </div>
    </>
  );
};

export default LeaveReqModal;
