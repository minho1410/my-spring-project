// src/components/MeasurementForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MeasurementForm.css';  // CSS 파일 임포트

function MeasurementForm({ onSaved, onSearch }) {
  const [searchValue, setSearchValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  // 전체 검색
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ value: searchValue, startDate, endDate });
  };

  // 전체 검색 초기화
  const handleReset = () => {
    setSearchValue('');
    setStartDate('');
    setEndDate('');
    onSearch({ value: '', startDate: '', endDate: '' }); // 전체 검색
  };

  // 등록 전용 화면으로 이동
  const goToRegister = () => {
    navigate('/monitoring/register'); 
  };

  return (
    <form onSubmit={handleSearch} className="measurement-form">
      <h3>🔍 측정값 검색</h3>
      <input
        type="text"
        placeholder="측정값 검색"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
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
      <button type="button" onClick={handleReset}>초기화</button>
      <button type="button" onClick={goToRegister}>+ 등록</button>
    </form>
  );
}

export default MeasurementForm;