import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Main from './pages/Main';
import WorkScheduleManagement from './pages/WorkScheduleManagement';
import WorkSchedule from './pages/WorkSchedule';
import Login from './pages/Login';
import PersonalTimeTable from './pages/PersonalTimeTable';
import DailyWorkerAndOff from './pages/DailyWorkerAndOff';
// import withAuthHoc from './withAuthHoc';

function App() {
  // const navigate = useNavigate();
  // console.log('#APPP');

  function RequireAuth({ children }) {
    // let auth = useAuth();
    let location = useLocation();
    const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));

    if (!userInfo) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
  }

  // 로그인 상태 관리
  // let isAuthorized = sessionStorage.getItem('userInfo');

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/main"
        element={
          <RequireAuth>
            <Main />
          </RequireAuth>
        }
      />
      <Route
        path="/management"
        element={
          <RequireAuth>
            <WorkScheduleManagement />
          </RequireAuth>
        }
      />
      <Route
        path="/personalTimeTable"
        element={
          <RequireAuth>
            <PersonalTimeTable />
          </RequireAuth>
        }
      />
      <Route
        path="/schedule"
        element={
          <RequireAuth>
            <WorkSchedule />
          </RequireAuth>
        }
      />
      <Route
        path="/workerAndOff"
        element={
          <RequireAuth>
            <DailyWorkerAndOff />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
