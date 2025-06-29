// src/components/MeasurementForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MeasurementForm.css';  // CSS 파일 임포트

function MeasurementForm({ onSaved, onSearch }) {
  const [searchDeviceId, setSearchDeviceId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ deviceId: searchDeviceId, startDate, endDate });
  };

  const goToRegister = () => {
    navigate('/monitoring/register'); // 등록 전용 화면으로 이동
  };

  return (
    <form onSubmit={handleSearch} className="measurement-form">
      <h3>🔍 측정값 검색</h3>
      <input
        type="text"
        placeholder="계측기 ID 검색"
        value={searchDeviceId}
        onChange={(e) => setSearchDeviceId(e.target.value)}
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button type="submit">검색</button>
      <button type="button" onClick={goToRegister}>+ 등록</button>
    </form>
  );
}

export default MeasurementForm;