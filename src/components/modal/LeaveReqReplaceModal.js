import React from 'react';
import '../../css/modal.css';
import { useLocation } from 'react-router-dom';
import apiClient from '../../config/apiClient';

const LeaveReqReplaceModal = (props) => {
  const { open, close, header } = props;
  const location = useLocation();
  // 현재 선택한 날짜
  const dateArr = location.state.split('-');
  const selectDate = `${dateArr[1]}월 ${dateArr[2]}일`;
  const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
  const myName = userInfo.name;

  // 선택 가능 자신의 휴무 날짜 (교환할 내 휴무일)

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
            <header>
              {header}
              <button className="close" onClick={close}>
                {' '}
                &times;{' '}
              </button>
            </header>
            <main>
              <div>
                <h2>휴무 교환 신청자 (본인)</h2>
                <p>{myName}</p>
                <form>
                  {/* requestDriverLeaveId : 기존 휴무일 */}
                  <select name="replace date">
                    <option value="list-${}1">{'교환할 내 휴무일'}</option>
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
                    <option value="list-${}2">{'승무원 선택'}</option>
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
