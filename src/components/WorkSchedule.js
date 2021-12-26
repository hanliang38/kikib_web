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
// let accessToken = JSON.parse(userdata).data.object.token;
// console.log(accessToken);

let workData = '2022-01';

const WorkSchedule = () => {
  // 근무일 수
  const [workDatas, setWorkDatas] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 근무일 데이터를 구하기
  const workDay = async () => {
    try {
      setError(null);
      setWorkDatas(null);
      setLoading(true);
      const response = await axios.get(
        `/api/driver/${userId}?yearMonth=${workData}`
      );
      setWorkDatas(response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    workDay();
  }, []);

  if (loading) return <div>{loadingImg}</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!workDatas) return null;
  // console.log('WorkDatas::', WorkDatas);
  let datas = workDatas.object;
  console.log('workData::', datas);
  // 근무일 수
  let day_num = datas.length;
  // 근무일 날짜
  // let workDays = datas.map((value) => {
  //   return value.date;
  // });

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

// handleDataClick = (arg) => {
//   alert(arg.dateStr);
// };

export default WorkSchedule;
