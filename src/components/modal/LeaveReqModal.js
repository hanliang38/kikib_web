import React, { useState } from 'react';
import '../../css/modal.css';
import { useLocation } from 'react-router-dom';
import Slick from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled, { createGlobalStyle } from 'styled-components';
import { GrPrevious as Prev, GrNext as Next } from 'react-icons/gr';

// 이전 버튼
const PrevArrow = ({ currentSlide, slideCount, ...props }) => (
  <Prev {...props} type="button" className="slick-prev" />
);

// 다음 버튼
const NextArrow = ({ currentSlide, slideCount, ...props }) => (
  <Next {...props} type="button" className="slick-next" />
);

const LeaveReqModal = (props) => {
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

  const fakeData = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
      <Global />
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
                      {fakeData.map((item, i) => (
                        <div key={i}>{item}</div>
                      ))}
                    </Slick>
                  </div>
                </SlickWrapper>
              </div>
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

const Global = createGlobalStyle`
  .slick-slide {
    display: inline-block;
    margin: 0
    font-size: 5vw;
  }`;

const SlickWrapper = styled.div`
  height: calc(100% - 44px);
  width: 80%;
  margin-left: auto;
  margin-right: auto;
`;

const dateBox = styled.button``;
export default LeaveReqModal;
