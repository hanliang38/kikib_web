import React, { useEffect, useState } from 'react';
import apiClient from '../config/apiClient';
import { useNavigate as navigate } from 'react-router';
import logoHeader from '../assets/img/logo_header.png';
import icoSearch from '../assets/img/ico_search.png';
import icoMsg from '../assets/img/ico_msg.png';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import calendarStyled from '@emotion/styled';
import ReplaceRequestList from '../components/ReplaceRequestList';
import ReplaceResultList from '../components/ReplaceResultList';
import '../css/common.css';

const today = new Date();
const nowYear = today.getFullYear();
const nowMonth = today.getMonth() + 1;
const currentMonth = nowMonth < 10 ? `0${nowMonth}` : nowMonth;
const nowYearMonth = `${nowYear}-${currentMonth}`;

const ReplaceRequest = () => {
  const [currentPage, setCurrentPage] = useState(true);
  const [yearMonth, setYearMonth] = useState(nowYearMonth);
  // const [reqSettleHold, setReqSettleHold] = useState();
  // const [reqConfirmHold, setReqConfirmHold] = useState();
  // const [resultDeny, setResultDeny] = useState();
  // const [resultCancel, setResultCancel] = useState();
  // const [resultAccept, setResultAccept] = useState();
  // const [resultReject, setResultReject] = useState();
  const [reqData, setReqData] = useState();
  const [resultData, setResultData] = useState();
  // const [annual]

  useEffect(() => {
    fetchData(yearMonth);
  }, [yearMonth]);

  // 로그인이 되어 있지 않으면 로그인 페이지로
  if (sessionStorage.getItem('userInfo') === null) {
    return navigate('/login');
  }
  const handleMonthChange = async (e) => {
    const currentDate = e.view.getCurrentData().currentDate;

    if (currentDate instanceof Date) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const dateString = `${year}-${month < 10 ? '0' + month : month}`;
      // console.log('dateString', dateString);
      setYearMonth(dateString);
    }
  };

  // api 불러오기
  const fetchData = async () => {
    // api 불러오기
    // await apiClient.get(`/replace/${yearMonth}`).then((res) => {
    await apiClient.get(`/replace/dev/test`).then((res) => {
      console.log('res', res);
      // 신청내역 데이터
      // const req = res.data.object.request;
      const req = res.data.object;

      // 합의대기
      const replaceReqSettleHold = req
        .filter(
          (item) =>
            item.reqDriverStatus === 'REQUEST' &&
            item.resDriverStatus === 'NONE' &&
            item.managerStatus === 'NONE'
        )
        .map((item) => {
          return {
            date: item.updatedAt.split(/[^0-9^]/g),
            replaceId: item.replaceId,
            reqDriverName: item.reqDriverName,
            reqDriverLeaveDate: item.reqDriverLeaveDate.split('-'),
            resDriverName: item.resDriverName,
            reqDriverWorkDate: item.reqDriverWorkDate.split('-'),
            status: '합의대기',
          };
        });

      // 승인대기
      const replaceReqConfirmHold = req
        .filter(
          (item) =>
            item.reqDriverStatus === 'REQUEST' &&
            item.resDriverStatus === 'REQUEST' &&
            item.managerStatus === 'NONE'
        )
        .map((item) => {
          return {
            date: item.updatedAt.split(/[^0-9^]/g),
            replaceId: item.replaceId,
            reqDriverName: item.reqDriverName,
            reqDriverLeaveDate: item.reqDriverLeaveDate.split('-'),
            resDriverName: item.resDriverName,
            reqDriverWorkDate: item.reqDriverWorkDate.split('-'),
            status: '승인대기',
          };
        });

      const reqHoldData = [...replaceReqSettleHold, ...replaceReqConfirmHold];

      setReqData(reqHoldData);

      // 처리결과 데이터
      // const result = res.data.object.result;
      const result = res.data.object;

      // 거절
      const replaceResultDeny = result
        .filter(
          (item) =>
            item.reqDriverStatus === 'REQUEST' &&
            item.resDriverStatus === 'CANCEL'
        )
        .map((item) => {
          return {
            replaceId: item.reqDriverId,
            reqDriverName: item.reqDriverName,
            reqDriverLeaveDate: item.reqDriverLeaveDate.split('-'),
            resDriverName: item.resDriverName,
            reqDriverWorkDate: item.reqDriverWorkDate.split('-'),
            updatedAt: item.updatedAt.split(/[^0-9^]/g),
            status: '취소',
            // ++ 배차완료시킨 관리자명 추가
          };
        });

      // 취소
      const replaceResultCancel = result
        .filter(
          (item) =>
            item.reqDriverStatus === 'CANCEL' &&
            item.resDriverStatus === 'REQUEST'
        )
        .map((item) => {
          return {
            replaceId: item.reqDriverId,
            reqDriverName: item.reqDriverName,
            reqDriverLeaveDate: item.reqDriverLeaveDate.split('-'),
            resDriverName: item.resDriverName,
            reqDriverWorkDate: item.reqDriverWorkDate.split('-'),
            updatedAt: item.updatedAt.split(/[^0-9^]/g),
            status: '취소',
            // ++ 배차완료시킨 관리자명 추가
          };
        });

      // 승인
      const replaceResultAccept = result
        .filter(
          (item) =>
            item.reqDriverStatus === 'REQUEST' &&
            item.resDriverStatus === 'REQUEST' &&
            item.managerStatus === 'ACCEPT'
        )
        .map((item) => {
          return {
            replaceId: item.reqDriverId,
            reqDriverName: item.reqDriverName,
            reqDriverLeaveDate: item.reqDriverLeaveDate.split('-'),
            resDriverName: item.resDriverName,
            reqDriverWorkDate: item.reqDriverWorkDate.split('-'),
            updatedAt: item.updatedAt.split(/[^0-9^]/g),
            status: '승인',
            // ++ 배차완료시킨 관리자명 추가
          };
        });

      // 반려
      const replaceResultReject = result
        .filter(
          (item) =>
            item.reqDriverStatus === 'REQUEST' &&
            item.resDriverStatus === 'REQUEST' &&
            item.managerStatus === 'DENY'
        )
        .map((item) => {
          return {
            replaceId: item.reqDriverId,
            reqDriverName: item.reqDriverName,
            reqDriverLeaveDate: item.reqDriverLeaveDate.split('-'),
            resDriverName: item.resDriverName,
            reqDriverWorkDate: item.reqDriverWorkDate.split('-'),
            updatedAt: item.updatedAt.split(/[^0-9^]/g),
            status: '반려',
            // ++ 배차완료시킨 관리자명 추가
          };
        });
      // console.log('annualResult', annualResult);
      const resultData = [
        ...replaceResultDeny,
        ...replaceResultCancel,
        ...replaceResultAccept,
        ...replaceResultReject,
      ];
      setResultData(resultData);
    });
  };

  return (
    <>
      <div className="container replaceStatus">
        <header>
          <div className="logo">
            <a href="/main">
              <img src={logoHeader} alt="kikiB" />
            </a>
          </div>
          <p className="page-title">휴무 교환내역</p>
          <div className="btn-box">
            <a href="#!" className="btn-search">
              <img src={icoSearch} alt="검색" />
            </a>
            <a href="#!" className="btn-msg">
              <img src={icoMsg} alt="메시지" />
            </a>
          </div>
        </header>
        <div className="inner">
          <StyledWrapper>
            <FullCalendar
              height="10vh"
              datesSet={handleMonthChange}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: 'prev',
                center: 'title',
                right: 'next',
              }}
              locale="ko"
            />
          </StyledWrapper>

          <div className="current-content">
            {' '}
            <div className="tab-list">
              <a
                href="#!"
                className={currentPage ? 'btn-tab on' : 'btn-tab'}
                onClick={() => setCurrentPage(true)}
              >
                신청내역
              </a>
              <a
                href="#!"
                className={currentPage ? 'btn-tab' : 'btn-tab on'}
                onClick={() => setCurrentPage(false)}
              >
                처리결과
              </a>
            </div>
            {currentPage ? (
              <ReplaceRequestList
                // reqSettleHold={reqSettleHold}
                // reqConfirmHold={reqConfirmHold}
                // reqData={[...reqSettleHold, ...reqConfirmHold]}
                reqData={reqData}
              />
            ) : (
              <ReplaceResultList
                // resultDeny={resultDeny}
                // resultCancel={resultCancel}
                // resultAccept={resultAccept}
                // resultReject={resultReject}
                // resultData={[
                //   ...resultDeny,
                //   ...resultCancel,
                //   ...resultAccept,
                //   ...resultReject,
                // ]}
                resultData={resultData}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const StyledWrapper = calendarStyled.div`
.fc-view-harness{
  display: none;
}
.fc-toolbar-title{ 
  font-size:30px;
}
.fc-prev-button { color: black; background-color: transparent; border:none;}
.fc-prev-button :before{ color: black;}
.fc-toolbar-chunk {font-size:30px;}
.fc-next-button{ color: black; background-color: transparent; border:none;}
.fc-next-button :before{ color: black; background-color: transparent; border:none;}
`;

export default ReplaceRequest;
