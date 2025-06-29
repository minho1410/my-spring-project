import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import MainPage from "./pages/MainPage/MainPage";
import MonitoringPage from "./pages/MonitoringPage/MonitoringPage";
import EditPage from "./pages/MonitoringPage/EditPage/EditPage";
import RegisterPage from "./pages/MonitoringPage/RegisterPage/RegisterPage";

function App() {
  return (
    <Router>
      <div>
        <h1>SPC 관리 시스템 테스트</h1>
        <nav>
          <Link to="/">🏠 메인</Link> |{" "}
          <Link to="/monitoring">📊 계측기 SPC 모니터링</Link>
        </nav>

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/monitoring" element={<MonitoringPage />} />
          <Route path="/monitoring/edit/:id" element={<EditPage />} />
          <Route path="/monitoring/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;