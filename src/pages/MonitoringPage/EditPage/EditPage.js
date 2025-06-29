import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditPage.css";  // CSS 임포트

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [measureTime, setMeasureTime] = useState("");

  useEffect(() => {
    axios.get(`/api/measurements/${id}`)
      .then(res => {
        const data = res.data;
        setValue(data.value);
        setDeviceId(data.deviceId);
        setMeasureTime(data.measureTime);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleSave = () => {
    axios.put(`/api/measurements/${id}`, {
      value: Number(value)
    })
      .then(() => {
        alert("수정 완료");
        navigate("/monitoring");
      })
      .catch(() => alert("수정 실패"));
  };

   return (
    <div className="edit-page">
      <h2>📌 측정값 수정</h2>

      <div>
        <label>계측기 ID:</label>
        <input value={deviceId} disabled /> {/* 수정 불가능 */}
      </div>

      <div>
        <label>측정값:</label>
        <input
          type="number"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>

      <div className="measure-time">
        측정시각: {new Date(measureTime).toLocaleString()}
      </div>

      <button onClick={handleSave}>저장</button>
      <button onClick={() => navigate(-1)}>취소</button>
    </div>
  );
}

export default EditPage;