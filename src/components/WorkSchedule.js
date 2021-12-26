import React, { useEffect, useState } from 'react';
import Navbar from './Navigationbar';
import Footer from './Footer';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import loadingImg from '../assets/Drawables/icon_progressbar_onloading.png';
import { icons } from 'react-icons/lib';

axios.withCredentials = true;
axios.defaults.withCredentials = true;

let userdata = sessionStorage.getItem('userInfo');
// console.log(userdata);
let userId = JSON.parse(userdata).data.object.userId;
// console.log('userId: ', userId);
let today = new Date();
let year = today.getFullYear();
let mon = ('0' + (today.getMonth() + 1)).slice(-2);
// let year_month =
// console.log('현재' + { year_month } + '입니다');
let currentMonth = year + '-' + mon;

const WorkSchedule = () => {
  // 근무일 수
  const [workDatas, setWorkDatas] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [leaveDatas, setLeaveDatas] = useState(null);

  // 근무일 데이터를 구하기
  const workDay = async () => {
    try {
      setError(null);
      setWorkDatas(null);
      setLoading(true);
      const response = await axios.get(
        `/api/driver/${userId}?yearMonth=${currentMonth}`
      );
      setWorkDatas(response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    workDay();
    leave();
  }, []);

  // 휴무일
  const leave = async () => {
    try {
      setError(null);
      setLeaveDatas(null);
      setLoading(true);
      const res = await axios.get(
        `/api/driver/${userId}/leave?yearMonth=${currentMonth}`
      );
      setLeaveDatas(res.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  if (loading) return <div>{loadingImg}</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!workDatas) return null;
  if (!leaveDatas) return null;
  // console.log('WorkDatas::', WorkDatas);
  // 근무일 obj
  let wdatas = workDatas.object;
  // console.log('workData::', wdatas);
  // 근무일 수
  let day_num = wdatas.length;
  // 근무일 날짜
  // let workDays = wdatas.map((value) => {
  //   return value.date;
  // });

  // 휴무일 obj
  let ldatas = leaveDatas.object;
  // console.log('ldatas::', ldatas);
  // 휴무일 수
  let leave_num = ldatas.length;
  // 휴무일 날짜
  let leaveDays = ldatas.map((value) => {
    return value.date;
  });
  console.log('leaveDays::', leaveDays);

  return (
    <div>
      <Navbar />
      <div className="schedule-page">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          // dateClick={this.handleDateClick}
          headerToolbar={{
            left: 'prev, next, today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          events={[{ title: 'work', date: '2021-12-25' }]}
          locale="ko"
        />
        <div className="leave-work-table">
          <table>
            <tbody>
              <tr>
                <th>근무일</th>
                <th>휴무일</th>
              </tr>
              <tr>
                <th>{day_num}일</th>
                <th>{leave_num}일</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WorkSchedule;
