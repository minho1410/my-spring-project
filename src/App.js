import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MonitoringPage from "./pages/MonitoringPage";
import MainPage from "./pages/MainPage"; // 홈 페이지 추가
import EditPage from "./pages/MonitoringPage/EditPage";

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
          <Route path="/" element={<MainPage  />} />
          <Route path="/monitoring" element={<MonitoringPage />} />
          <Route path="/monitoring/edit/:id" element={<EditPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;