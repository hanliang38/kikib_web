import React, { useState } from 'react';
import '../../css/modal.css';
import { useLocation } from 'react-router-dom';
import Slick from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { GrPrevious as Prev, GrNext as Next } from 'react-icons/gr';
import apiClient from '../../config/apiClient';

// 이전 버튼
const PrevArrow = ({ currentSlide, slideCount, ...props }) => (
  <Prev {...props} type="button" className="slick-prev" />
);

// 다음 버튼
const NextArrow = ({ currentSlide, slideCount, ...props }) => (
  <Next {...props} type="button" className="slick-next" />
);

//아이템 값이 처음 나오는 배열 아이템 삭제
function removeItem(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

const LeaveReqModal = (props) => {
  const [curWorkId, setCurWorkId] = useState();
  const [checked, setChecked] = useState(false);
  const [selected, setSelected] = useState();
  const [selectArr, setSelectArr] = useState([]);
  // const [pageNum, setPageNum] = useState(0);

  const { open, close } = props;
  const location = useLocation();
  // 현재 선택한 날짜
  const dateArr = location.state.date.split('-');
  const selectDate = `${dateArr[1]}월 ${dateArr[2]}일`;
  // 휴무신청기간
  const applyTermArr = location.state.applyTerm.split('~');
  const startTermArr = applyTermArr[0].split('-');
  const endTermArr = applyTermArr[1].split('-');
  const applyTarget = location.state.applyTarget.split('-');

  // 선택가능한 휴무일
  const LeaveDate = location.state.leaveData;
  const chooseLeaveDateArr = [];
  LeaveDate.map((item) => chooseLeaveDateArr.push(item.date.split('-')[2]));

  const values = () => {
    // workId 구하기
    const workData = location.state.workList;
    workData
      .filter((date) => date.date === location.state.date)
      .map((item) => setCurWorkId(item.id));
  };

  // 버튼클릭에 따라 이벤트 작동
  const handleCheckBtn = () => {
    // 휴무일 추가 값 구하기 (체크된 날짜의 leaveId)
    const selectList = [];
    // 체크박스가 체크되어 있으면 push, false가 되면 해당값을 배열에서 지운다.
    checked === true
      ? selectList.push(selected)
      : removeItem(selectList, selected);

    // selectArr에 추가
    setSelectArr(selectList);
  };
  console.log(checked);
  console.log(selected);
  console.log(selectArr);

  // 확인 버튼 클릭시 post
  const onSubmitFetchData = async () => {
    values();

    await apiClient
      .post(`/driver/leave/request`, {
        id: 0,
        originLeaves: selectArr,
        workId: curWorkId,
      })
      .then((res) => {
        //handle success
        // res.status === 200 ? setPageNum(1) : setPageNum(0);
      });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <>
      <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
          <section>
            <main>
              <h1>
                휴무 신청 기간
                <br /> {applyTarget[0]}년 {applyTarget[1]}월
              </h1>
              <h2>
                {startTermArr[1]}월 {startTermArr[2]}일 - {endTermArr[1]}월
                {endTermArr[2]}일
              </h2>
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
              <div>
                {' '}
                <SlickWrapper>
                  <div>
                    <Slick {...settings}>
                      {chooseLeaveDateArr.map((item, i) => (
                        <DateBox key={i}>
                          <label htmlFor={item}>{item}일</label>
                          <input
                            type="checkbox"
                            id={item}
                            value={item}
                            onChange={(e) => {
                              setChecked(e.target.checked);
                              setSelected(e.target.value);
                              handleCheckBtn();
                            }}
                          ></input>
                        </DateBox>
                      ))}
                    </Slick>
                  </div>
                </SlickWrapper>
              </div>
              <br />
              <div>
                {selectArr.length > 0 ? (
                  <>
                    {dateArr[1]}월 {selectArr}일로 <br />
                    {selectDate} 휴무 신청을 진행합니까?
                  </>
                ) : (
                  `휴무일을 선택해주세요.`
                )}
              </div>
              <button className="close" onClick={close}>
                취소
              </button>
              <button onClick={() => onSubmitFetchData}>확인</button>
            </main>
          </section>
        ) : null}
      </div>
    </>
  );
};

const SlickWrapper = styled.div`
  height: calc(100% - 44px);
  width: 80%;
  margin-left: auto;
  margin-right: auto;
`;

const DateBox = styled.div`
  font-size: 25px;
  border: 2px solid #a2a9ad;
  border-radius: 2rem;
  background-color: #efefef;

  input:checked {
    background-color: #007473;
    border: 2px solid #192733;
  }
`;
export default LeaveReqModal;
