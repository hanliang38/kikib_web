import React from 'react';
import Navbar from './Navigationbar';
import Footer from './Footer';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import axios from 'axios';

axios.withCredentials = true;
axios.defaults.withCredentials = true;

let userdata = sessionStorage.getItem('userInfo');
// console.log(userdata);
let userId = JSON.parse(userdata).data.object.userId;
// console.log('userId: ', userId);
// let accessToken = JSON.parse(userdata).data.object.token;
// console.log(accessToken);

let workData = '2021-12';

// 근무일 날짜를 구하기
var workDays;
// 근무일 데이터를 구하기
const workDay = axios
  .get(`/api/driver/${userId}?yearMonth=${workData}`)
  .then((workRes) => {
    //handle success
    // console.log('workRes :', workRes);
    let workDay_data = workRes.data.object;

    // // console.log(obj);
    workDays = workDay_data.map((value) => {
      return value.date;
    });
    console.log('workDays: ', workDays);
    return workDays;
  })
  .catch((err) => {
    //handle error
    console.log(`Error : ${err}`);
  });
// console.log('데헷', workDays);
// console.log('workDay_data: ', workDay_data);
// console.log('근무일 수: ', workDay_data.length);

const WorkSchedule = () => {
  var day_num;
  workDay.then((result) => {
    console.log('result', result);
    day_num = result.length;
    console.log(day_num);
    return day_num;
  });

  console.log('day_num::', day_num);
  // 근무일 수를 구하기
  // let workDay_num;
  // // console.log('axios res : ', workDay);
  // workDays_num.length = workDay_num;
  // console.log('workDay_num', workDay_num);
  // workDay_days = workDay.then();
  // console.log('workDay_days', workDay_days);

  // // 휴무일 수를 구하기 위함
  // let leave_num;
  // // 휴무일 날짜를 구하기 위함
  // // let leave_days;
  // // 휴무일
  // const leave = axios
  //   .get(`/api/driver/${userId}/leave?yearMonth=${workData}`)
  //   .then((leaveRes) =>
  //     //handle success
  //     {
  //       // console.log('leaveRes: ', leaveRes);
  //       leave_num = leaveRes.data.object.length;
  //       // console.log('leave_num', leave_num);
  //       // let obj = leaveRes.data.object;
  //       // // console.log(obj);
  //       // leave_days = obj.map((value) => {
  //       //   return value.date;
  //       // });
  //     }
  //   )
  //   .catch((err) => {
  //     //handle error
  //     console.log(`Error : ${err}`);
  //   });
  // // console.log('axios res : ', leave);
  // leave_num = leave.then();
  // leave_days = leave.then();
  // console.log(leave_days);

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
              </tr>
              <tr>
                {console.log('나왔지롱~~~!', day_num)}
                <th>{day_num}일</th>
                {/* <th>{leave_num}일</th> */}
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
