import React, { useEffect, useRef, useState } from 'react';
import icoTel from '../assets/img/ico_tel.png';
// import styled, { createGlobalStyle } from 'styled-components';
// import DefaultFont from '../assets/font/agothic14.otf';

const WorkerList = ({ workerRows }) => {
  const [workerDataObj, setWorkerDataObj] = useState();
  // const [headHeight, setHeadHeight] = useState();
  console.log(workerRows);

  // table-head 높이값 체크
  const divElRef = useRef();
  // const styles = { height: `calc(100% - ${headHeight}px)` };

  useEffect(() => {
    fetchData(workerDataObj);
    // setHeadHeight(divElRef.current.clientHeight);
  }, [workerDataObj]);

  const fetchData = () => {
    const workDataRows = workerRows;
    setWorkerDataObj(workDataRows);
  };

  return (
    <>
      <div className="table-box">
        <div className="table-head" ref={divElRef}>
          <span>성명</span>
          <span>상태</span>
          <span>현황</span>
          <span>연락망</span>
        </div>

        {/* <div className="table-body" style={styles}> */}
        <div className="table-body">
          {workerDataObj &&
            workerDataObj.map((row, i) => (
              <div className="list-row" key={`workList-${i}`}>
                <span>{row.name}</span>
                <span>{row.status}</span>
                <span>---</span>
                {/* 전화번호 입력 시 모바일기기에서 전화연결 가능 */}
                <span className="btn-tel">
                  <a href="tel:전화번호">
                    <img src={icoTel} alt="전화" />
                  </a>
                </span>
              </div>
            ))}

          <div className="request-box">
            <ul>
              <li>
                <button>
                  휴무
                  <br />
                  신청
                </button>
              </li>
              <li>
                <button className="btn-change btn-disabled">
                  휴무
                  <br />
                  교환
                </button>
              </li>
              <li>
                <button>
                  연차
                  <br />
                  신청
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkerList;
