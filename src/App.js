import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import MainPage from "./pages/MainPage/MainPage";
import MonitoringPage from "./pages/MonitoringPage/MonitoringPage";
import EditPage from "./pages/MonitoringPage/EditPage/EditPage";
import RegisterPage from "./pages/MonitoringPage/RegisterPage/RegisterPage";
import DeviceManagementPage from "./pages/DeviceManagementPage/DeviceManagementPage";

function App() {
  return (
    <Router>
      <div>
        <h1>SPC 관리 시스템 테스트</h1>
        <nav>
          <Link to="/">🏠 메인</Link>
          <Link to="/monitoring">📊 계측기 SPC 모니터링</Link>
          <Link to="/devices">🛠 계측기 관리</Link>
        </nav>

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/monitoring" element={<MonitoringPage />} />
          <Route path="/monitoring/edit/:id" element={<EditPage />} />
          <Route path="/monitoring/register" element={<RegisterPage />} />
          <Route path="/devices" element={<DeviceManagementPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;