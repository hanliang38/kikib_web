import React, { useState } from 'react';
import '../../css/modal.css';
import { useLocation } from 'react-router-dom';
import apiClient from '../../config/apiClient';

const LeaveReqReplaceModal = (props) => {
  const { open, close } = props;
  const location = useLocation();
  // 현재 선택한 날짜
  const dateArr = location.state.date.split('-');
  const selectDate = `${dateArr[1]}월 ${dateArr[2]}일`;
  const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
  const myName = userInfo.name;
  // const

  // 1. 선택 가능 자신의 휴무 날짜 (교환할 내 휴무일) (휴무 -> 근무)
  const leaveData = location.state.leaveData;
  // 2. 현재 근무날짜의 WorkId = 휴무일로 바꾸고 싶은 근무일 (근무 -> 휴무)
  // 3. 교환하고 싶은 사람의 데이터
  const workData = location.state.workList;
  const allData = location.state.allData;

  console.log(
    'workData',
    workData,
    'leaveData::',
    leaveData,
    'allData::',
    allData
  );

  // 요청
  const fetchData = async () => {
    await apiClient
      .post(`/replace/request`, {
        reqDriverLeaveId: 0,
        reqDriverWorkId: 0,
        resDriverLeaveId: 0,
      })
      .then((res) => {});
  };

  return (
    <>
      <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
          <section>
            <header>{selectDate} 휴무교환</header>
            <main>
              <div>
                <h2>휴무 교환 신청자 (본인)</h2>
                <p>{myName}</p>
                <form>
                  {/* requestDriverLeaveId : 기존 휴무일 */}
                  <select name="replace date">
                    <option value="none">{'교환할 내 휴무일'}</option>
                    <option value="list-${}2">{'00월 00일'}</option>
                    <option value="list-${}3">{'00월 00일'}</option>
                    <option value="list-${}4">{'00월 00일'}</option>
                  </select>
                </form>
              </div>
              <div>⌵</div>
              <br />
              <div>
                <h2>휴무 교환 대상</h2>
                <form>
                  {/* resDriverLeaveId : 요청할 사람의 날짜 */}
                  <select name="replace name">
                    <option value="none">{'승무원 선택'}</option>
                    <option value="list-${}1">{'고길동'}</option>
                    <option value="list-${}3">{'전우치'}</option>
                    <option value="list-${}4">{'삼식이'}</option>
                  </select>
                </form>
                {/* reqDriverWorkId : 쉬고 싶은 날짜 */}
                <h2>교환 신청일 : {selectDate}</h2>
                <p>
                  확인 시 해당 승무원에게
                  <br /> 휴무 교환 요청을 진행합니다.
                  <br />
                </p>
                <p>신청하는 정보가 맞습니까?</p>
              </div>
              <button>취소</button>
              <button>확인</button>
            </main>
            <footer>
              <button className="close" onClick={close}>
                {' '}
                close{' '}
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    </>
  );
};

export default LeaveReqReplaceModal;
