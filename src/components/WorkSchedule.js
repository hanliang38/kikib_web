import React from 'react';
import Navbar from './Navigationbar';
import Footer from './Footer';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import axios from 'axios';

axios.withCredentials = true;
axios.defaults.withCredentials = true;

let userdata = window.sessionStorage.getItem('userInfo');
// console.log(userdata);
let userId = JSON.parse(userdata).data.object.userId;
// console.log('userId: ', userId);
// let accessToken = JSON.parse(userdata).data.object.token;
// console.log(accessToken);

let workData = '2021-12';

// 근무일 수를 구하기 위함
let workDay_num;
// 근무날짜들을 구하기 위함
// let workDay_days;

// 근무일 가져오기
const workDay = axios
  .get(`/api/driver/${userId}?yearMonth=${workData}`)
  .then((workRes) =>
    //handle success
    {
      console.log('workRes :', workRes);
      // return workRes;
      workDay_num = workRes.data.object.length;
      // console.log(workDay_num);
      // let obj = workRes.data.object;
      // // console.log(obj);
      // workDay_days = obj.map((value) => {
      //   return value.date;
      // });
      // console.log(workDay_days);
    }
  )
  .catch((err) => {
    //handle error
    console.log(`Error : ${err}`);
  });
// console.log('axios res : ', workDay);
workDay_num = workDay.then();
// console.log('workDay_num',workDay_num);
// workDay_days = workDay.then();
// console.log('workDay_days', workDay_days);

// 휴무일 수를 구하기 위함
let leave_num;
// 휴무일 날짜를 구하기 위함
// let leave_days;
// 휴무일
const leave = axios
  .get(`/api/driver/${userId}/leave?yearMonth=${workData}`)
  .then((leaveRes) =>
    //handle success
    {
      // console.log('leaveRes: ', leaveRes);
      leave_num = leaveRes.data.object.length;
      console.log('leave_num', leave_num);
      // let obj = leaveRes.data.object;
      // console.log(obj);
      // leave_days = obj.map((value) => {
      //   return value.date;
      // });
    }
  )
  .catch((err) => {
    //handle error
    console.log(`Error : ${err}`);
  });
// console.log('axios res : ', leave);
leave_num = leave.then();
// leave_days = leave.then();
// console.log(leave_days);

// const annual = () => {
//   let annualData = new FormData();
//   annualData.append('yearMonth', '2021-12');
//   axios({
//     method: 'get',
//     url: `/api/driver/${userId}/leave`,
//     data: annualData,
//     headers: { Authorization: `${accessToken}` },
//   }).then((leaveRes) =>
//     //handle success
//     console.log('leaveRes: ', leaveRes)
//   );
// };

const WorkSchedule = () => {
  return (
    <div>
      <Navbar />
      <div className="schedule-page">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
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
                <th>잔여연차</th>
              </tr>
              <tr>
                {/* <th>{workDay_num}일</th>
                <th>{leave_num}일</th> */}
                <th>0회</th>
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
