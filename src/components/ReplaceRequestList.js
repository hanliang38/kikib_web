import React, { useState } from 'react';
import styled from 'styled-components';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { GrNext, GrPrevious } from 'react-icons/gr';
import CancelCheck from './modal/CancelCheck';

const ReplaceRequestList = ({ reqData }) => {
  console.log(reqData);
  const [cancelId, setCancelId] = useState();
  const [cancelCheckModal, setCancelCheckModal] = useState(false);

  const openCheck = (e) => {
    setCancelCheckModal(true);
  };
  const closeCheck = (e) => {
    setCancelCheckModal(false);
  };

  return (
    <>
      {reqData ? (
        <div>
          {reqData.map((item, i) => (
            <div key={`annualReqList-${i}`}>
              <LogBox>{`${item.date[0]}.${item.date[1]}.${item.date[2]} ${item.date[3]}:${item.date[4]}`}</LogBox>
              <ListBox>
                <TextBox>
                  {item.reqDriverName}
                  <br />
                  {`${item.reqDriverLeaveDate[1]}월 ${item.reqDriverLeaveDate[1]}일`}
                </TextBox>
                <TextBox>
                  <GrPrevious color="#A2A9AD" />
                </TextBox>
                <TextBox>
                  {item.status.substr(0, 2)}
                  <br />
                  {item.status.substr(2, 2)}
                </TextBox>
                <TextBox>
                  <GrNext color="#A2A9AD" />
                </TextBox>
                <TextBox>
                  {item.resDriverName}
                  <br />
                  {item.reqDriverWorkDate[1]}월{item.reqDriverWorkDate[2]}일
                </TextBox>
                <TextBox>
                  <a
                    href="#!"
                    onClick={() => {
                      setCancelId(item.replaceId);
                      openCheck();
                    }}
                  >
                    <MdOutlineDeleteForever size="30" color="#A2A9AD" />
                  </a>
                  <CancelCheck
                    open={cancelCheckModal}
                    close={closeCheck}
                    replaceId={cancelId}
                    status={'휴무 신청'}
                  ></CancelCheck>
                </TextBox>
              </ListBox>
            </div>
          ))}
        </div>
      ) : (
        <>데이터가 없습니다.</>
      )}
    </>
  );
};

const LogBox = styled.div`
  font-size: 13px;
  background-color: #a2a9ad;
  color: white;
  padding: 5px;
  width: 50%;
  text-align: center;
  border-radius: 3rem;
  margin: 5px;
`;

const ListBox = styled.div`
  font-size: 18px;
  background-color: #efefef;
  padding: 10px;
  width: 100%;
  text-align: center;
  border-radius: 1.5rem;
  border: 2px solid white;
`;

const TextBox = styled.div`
  display: inline-block;
  margin: 0 8px;
  text-align: center;
  vertical-align: middle;
`;

export default ReplaceRequestList;
