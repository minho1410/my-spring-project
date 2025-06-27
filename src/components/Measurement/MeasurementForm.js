// src/components/MeasurementForm.js
import React, { useState } from 'react';
import axios from 'axios';

function MeasurementForm({ onSaved }) {
  const [deviceId, setDeviceId] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!deviceId || !value) {
      alert("값을 입력하세요.");
      return;
    }

    const newMeasurement = {
      deviceId,
      value: parseFloat(value),
      // measureTime은 서버에서 생성하도록 생략해도 됨
    };

    try {
      await axios.post("/api/measurements", newMeasurement);
      onSaved(); // 등록 성공 시 리스트 새로고침 요청
      setDeviceId('');
      setValue('');
    } catch (error) {
      console.error("등록 실패:", error);
      alert("등록 실패");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
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
    </form>
  );
}

export default MeasurementForm;