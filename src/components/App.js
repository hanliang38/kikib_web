import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main';
import WorkScheduleManagement from './WorkScheduleManagement';
import WorkSchedule from './WorkSchedule';
import Login from './Login';

function App() {
  // 로그인 상태 관리

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/main" element={<Main />} />
          <Route exact path="/management" element={WorkScheduleManagement} />
          <Route exact path="/schedule" element={WorkSchedule} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
