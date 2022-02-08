import React from 'react';
import '../../css/modal.css';

const InfoModal = (props) => {
  const { open, close, header } = props;

  // document.body.classList.add('stop-scroll');
  // document.body.classList.remove('scroll-scroll');

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
              <h2>휴무 신청</h2>
              <p>
                휴무 신청은 지정된 휴무신청기간에
                <br />
                신청휴무일로 접근하여
                <br />
                휴무신청버튼으로 신청합니다.
                <br />
                변경할 기존 휴무일을 선택하셔야 하며
                <br />
                중복 선택 신청을 하실 경우
                <br /> 휴무 신청 승인 확률이 높아지며
                <br />
                먼저 처리된 기존 휴무일 하루만
                <br />
                소진되며 처리되지 않은 휴무일은
                <br />
              </p>
              {/* <h2>휴무 교환 신청</h2>
              <p>
                휴무 교환은 승무원간 1:1 합의가
                <br /> 필요한 부분으로 휴무 교환을 원하는
                <br /> 신청자가 요청할 승무원과 기존 휴무일을
                <br /> 선택하여 휴무 교환을 신청합니다.
                <br /> 요청받은 승무원은 요청목록에서
                <br /> 휴무 교환 요청을 확인 가능하며
                <br /> 합의로 처리하면서 정상적으로 관리자에게
                <br /> 휴무교환 신청이 완료됩니다.
              </p> */}
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

export default InfoModal;
