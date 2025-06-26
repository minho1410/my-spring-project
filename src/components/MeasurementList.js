// src/components/MeasurementList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

/**
 * 계측기 측정 데이터 리스트를 보여주는 컴포넌트
 */
function MeasurementList({ reloadTrigger }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/measurements")
      .then((res) => setData(res.data))
      .catch((err) => console.error("불러오기 실패:", err));
  }, [reloadTrigger]); // reloadTrigger가 바뀔 때마다 재요청

  return (
    <div className="list">
      <h2>📈 측정값 목록</h2>
      <table>
        <thead>
          <tr>
            <th>계측기 ID</th>
            <th>측정값</th>
            <th>측정시각</th>
          </tr>
        </thead>
        <tbody>
          {data.map((m, index) => (
            <tr key={index}>
              <td>{m.deviceId}</td>
              <td>{m.value}</td>
              <td>{new Date(m.measureTime).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MeasurementList;