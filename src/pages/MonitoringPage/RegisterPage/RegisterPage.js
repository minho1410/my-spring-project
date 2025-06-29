// src/pages/MonitoringPage/RegisterPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './RegisterPage.css';

function RegisterPage() {
  const [deviceId, setDeviceId] = useState('');
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!deviceId || !value) {
      alert("값을 모두 입력하세요.");
      return;
    }

    try {
      await axios.post("/api/measurements", {
        deviceId,
        value: parseFloat(value),
      });
      alert("등록 완료");
      navigate("/monitoring"); // 등록 후 목록으로 이동
    } catch (err) {
      console.error("등록 실패:", err);
      alert("등록 실패");
    }
  };

  return (
    <div className="register-form-page">
      <h2>📌 측정값 등록</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          placeholder="계측기 ID"
          value={deviceId}
          onChange={(e) => setDeviceId(e.target.value)}
        />
        <input
          type="number"
          placeholder="측정값"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">등록</button>
        <button type="button" onClick={() => navigate(-1)}>취소</button>
      </form>
    </div>
  );
}

export default RegisterPage;