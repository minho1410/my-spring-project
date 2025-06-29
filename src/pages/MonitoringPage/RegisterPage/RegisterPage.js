import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './RegisterPage.css';

function RegisterPage() {
  const [deviceId, setDeviceId] = useState('');
  const [value, setValue] = useState('');
  const [deviceList, setDeviceList] = useState([]);
  const navigate = useNavigate();

  // ⛳ 측정되지 않은 계측기만 불러오기
  useEffect(() => {
    axios.get("/api/measurements/devices/unmeasured")
      .then(res => setDeviceList(res.data))
      .catch(err => {
        console.error("계측기 목록 로딩 실패:", err);
        alert("계측기 목록을 불러오지 못했습니다.");
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!deviceId || !value) {
      alert("값을 모두 입력하세요.");
      return;
    }

    // 숫자 자릿수 검증 (정수 7자리 이하, 소수점 3자리 이하)
    const regex = /^\d{1,7}(\.\d{1,3})?$/;
    if (!regex.test(value)) {
      alert("측정값은 정수 7자리 이하 + 소수점 3자리 이하만 입력 가능합니다.");
      return;
    }

    try {
      await axios.post("/api/measurements", {
        deviceId,                     // ⚠ 백엔드가 deviceId(Long or String)인지 확인 필요
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
        <select
          value={deviceId}
          onChange={(e) => setDeviceId(e.target.value)}
        >
          <option value="">계측기 선택</option>
          {deviceList.map(device => (
            <option key={device.id} value={device.deviceId}>
              {device.deviceName} ({device.deviceId})
            </option>
          ))}
        </select>
        <input
          type="number"
          step="0.001"
          max="9999999.999"
          placeholder="측정값 (최대 9999999.999)"
          value={value}
          onChange={(e) => {
            const input = e.target.value;
            const regex = /^\d{0,7}(\.\d{0,3})?$/;
            if (regex.test(input) || input === '') {
              setValue(input);
            } else {
              alert("최대 7자리 정수와 소수점 이하 3자리까지 입력 가능합니다.");
            }
          }}
        />

        <div className="button-group">
          <button type="submit">등록</button>
          <button type="button" onClick={() => navigate(-1)}>취소</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;