import React, { useState } from 'react';
import '../../css/modal.css';
import { useLocation } from 'react-router-dom';
import apiClient from '../../config/apiClient';
import LeaveReplaceCheckModal from './LeaveReplaceCheckModal';

const LeaveReqReplaceModal = (props) => {
  const { open, close, offList } = props;
  const location = useLocation();
  // 현재 선택한 날짜
  const dateArr = location.state.date.split('-');
  const selectDate = `${dateArr[1]}월 ${dateArr[2]}일`;
  const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
  const myName = userInfo.name;
  // state값
  const [selectAngel, setSelectAngel] = useState('승무원');
  const [selectMyLeave, setSelectMyLeave] = useState('00월 00일');
  const [leaveDate, setLeaveDate] = useState('00월 00일');
  const [pageNum, setPageNum] = useState(0);

  // 1. 선택 가능 자신의 휴무 날짜 (교환할 내 휴무일) (휴무 -> 근무)
  const leaveData = location.state.leaveData;
  const reqDriverLeaveId = leaveData
    .filter((item) => item.date === selectMyLeave)
    .map((item) => item.id);

  // 2. 현재 근무날짜의 WorkId = 휴무일로 바꾸고 싶은 근무일 (근무 -> 휴무)
  const workData = location.state.workList;
  const reqDriverWorkId = workData
    .filter((item) => item.date === location.state.date)
    .map((item) => item.id);

  // 3. 교환하고 싶은 사람의 데이터
  const angel = offList;
  const resDriverLeaveId = angel
    .filter((item) => item.driverName === selectAngel)
    .map((item) => item.workId);

  const handleSelectAngel = (e) => {
    setSelectAngel(e.target.value);
  };
  const handleSelectMyLeave = (e) => {
    setSelectMyLeave(e.target.value);
    const leaveDateArr = e.target.value.split('-');
    setLeaveDate(`${leaveDateArr[1]}월 ${leaveDateArr[2]}일`);
  };

  // 요청
  const onSubmitFetchData = async (e) => {
    e.preventDefault();
    await apiClient
      .post(`/replace/request`, {
        reqDriverLeaveId: reqDriverLeaveId[0],
        reqDriverWorkId: reqDriverWorkId[0],
        resDriverLeaveId: resDriverLeaveId[0],
      })
      .then((res) => {
        //handle success
        res.status === 200 ? setPageNum(1) : setPageNum(0);
      });
  };

  const ableSubmit = {
    background: '#007473',
    color: 'white',
  };

  const replaceBlock = {
    display: 'inline-block',
    margin: '10px',
  };

  const disableSubmit = {
    color: '#a2a9ad',
    background: '#efefef',
    border: 'solid 3px #a2a9ad',
  };

  return (
    <>
      <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
          <section>
            {pageNum === 0 ? (
              <main>
                <div>
                  휴무 교환 신청일
                  <br />
                  {/* reqDriverWorkId : 쉬고 싶은 날짜 */}
                  {selectDate}
                </div>
                <br />
                <div>
                  <h2>휴무 교환 대상</h2>
                  <form>
                    {/* resDriverLeaveId : 요청할 사람 */}
                    <select name="replace name" onChange={handleSelectAngel}>
                      <option value="승무원" selected="selected">
                        승무원 선택 ⌵
                      </option>
                      {angel.map((myAngel, i) => (
                        <option key={`list-${i}`} value={myAngel.driverName}>
                          {myAngel.driverName}
                        </option>
                      ))}
                    </select>
                  </form>
                  <h2>교환할 내 휴무일</h2>
                  <form>
                    {/* requestDriverLeaveId : 기존 휴무일 */}
                    <select name="replace date" onChange={handleSelectMyLeave}>
                      <option value="0000-00-00" selected="selected">
                        휴무일 선택 ⌵
                      </option>
                      {leaveData.map((myLeave, i) => (
                        <option key={`list-${i}`} value={myLeave.date}>
                          {myLeave.date}
                        </option>
                      ))}
                    </select>
                  </form>
                </div>
                <div>⌵</div>
                <div>
                  <span style={replaceBlock}>
                    {myName}
                    <br />
                    {leaveDate}
                  </span>
                  <div style={replaceBlock}>
                    →<br />←
                  </div>
                  <span style={replaceBlock}>
                    {selectAngel}
                    <br />
                    {selectDate}
                  </span>
                </div>
                <div>
                  {selectAngel !== '승무원' && leaveDate !== '00월 00일' ? (
                    <p>휴무 교환 정보가 맞습니까?</p>
                  ) : (
                    <p>정보를 입력해주세요</p>
                  )}
                </div>

                <button className="close" onClick={close}>
                  취소
                </button>
                {selectAngel !== '승무원' && leaveDate !== '00월 00일' ? (
                  <button onClick={onSubmitFetchData} style={ableSubmit}>
                    확인
                  </button>
                ) : (
                  <button style={disableSubmit}>확인</button>
                )}
              </main>
            ) : (
              <LeaveReplaceCheckModal close={close} />
            )}
          </section>
        ) : null}
      </div>
    </>
  );
};

export default LeaveReqReplaceModal;
