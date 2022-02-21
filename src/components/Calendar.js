import React, { useState } from 'react';
import * as moment from 'moment';

const Calendar = () => {
  const [getMoment, setMoment] = useState(moment());

  const today = getMoment;
  const firstWeek = today.clone().startOf('month').week();
  const lastWeek =
    today.clone().endOf('month').week() === 1
      ? 53
      : today.clone().endOf('month').week();

  // 날짜 데이터
  function createData(sun, mon, tue, wed, thu, fri, sat) {
    return { sun, mon, tue, wed, thu, fri, sat };
  }

  // 오늘 : moment().format('YYYYMMDD') === days.format('YYYYMMDD')
  // 이번달 x : (days.format('MM') !== today.format('MM'))

  const calendarArr = () => {
    while (firstWeek <= lastWeek) {
      createData(getMoment.format('D'));
    }
  };

  return (
    <div className="App">
      <div className="control">
        <button
          onClick={() => {
            setMoment(getMoment.subtract(1, 'month'));
          }}
        >
          {'<'}
        </button>
        <span>{today.format('YYYY년 MM월')}</span>
        <button
          onClick={() => {
            setMoment(getMoment.add(1, 'month'));
          }}
        >
          {'>'}
        </button>
      </div>
      <table>
        <thead>
          <td>
            <span>일</span>
          </td>
          <td>
            <span>월</span>
          </td>
          <td>
            <span>화</span>
          </td>
          <td>
            <span>수</span>
          </td>
          <td>
            <span>목</span>
          </td>
          <td>
            <span>금</span>
          </td>
          <td>
            <span>토</span>
          </td>
        </thead>
        <tbody>{calendarArr()}</tbody>
      </table>
    </div>
  );
};

export default Calendar;
