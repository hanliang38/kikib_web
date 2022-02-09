import React /*useState*/ from 'react';
import '../../css/modal.css';
import { useLocation } from 'react-router-dom';
import apiClient from '../../config/apiClient';

const LeaveReqReplaceModal = (props) => {
  const { open, close, offList } = props;
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
  const workData = location.state.workList;
  const allData = location.state.allData;
  // 3. 교환하고 싶은 사람의 데이터
  const angel = offList;
  console.log('angel::', angel);

  console.log(
    'workData',
    workData,
    'leaveData::',
    leaveData,
    'allData::',
    allData
  );

  // // 요청
  // const fetchData = async () => {
  //   await apiClient
  //     .post(`/replace/request`, {
  //       reqDriverLeaveId: 0,
  //       reqDriverWorkId: 0,
  //       resDriverLeaveId: 0,
  //     })
  //     .then((res) => {});
  // };

  return (
    <>
      <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
          <section>
            <header>
              휴무 교환 신청일
              <br />
              {/* reqDriverWorkId : 쉬고 싶은 날짜 */}
              {selectDate}
            </header>
            <main>
              <div>
                <h2>휴무 교환 대상</h2>
                <form>
                  {/* resDriverLeaveId : 요청할 사람 */}
                  <select name="replace name">
                    <option value="none">승무원 선택 ⌵</option>
                    {angel.map((myAngel, i) => (
                      <option key={`list-${i}`}>{myAngel.driverName}</option>
                    ))}
                  </select>
                </form>
                <h2>교환할 내 휴무일</h2>
                <form>
                  {/* requestDriverLeaveId : 기존 휴무일 */}
                  <select name="replace date">
                    <option value="none">휴무일 선택 ⌵</option>
                    {leaveData.map((myLeave, i) => (
                      <option key={`list-${i}`}>{myLeave.date}</option>
                    ))}
                  </select>
                </form>
              </div>
              <div>⌵</div>
              <br />
              <div>
                <span>
                  {myName}
                  <br />
                  {`내 휴무`}
                </span>
                <div>
                  →<br />←
                </div>
                <span>
                  {`천사님`}
                  <br />
                  {selectDate}
                </span>
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
