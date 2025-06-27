// pages/MonitoringPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import MeasurementForm from '../../components/Measurement/MeasurementForm';
import MeasurementList from '../../components/Measurement/MeasurementList';
import MeasurementChart from "../../components/Measurement/MeasurementChart";

function MonitoringPage() {
  const [reload, setReload] = useState(false);
  const [data, setData] = useState([]); // ✅ 계측기 데이터 상태 추가

  const handleSaved = () => setReload(!reload);

  const fetchData = () => {
    axios
      .get("/api/measurements")
      .then((res) => setData(res.data))
      .catch((err) => console.error("데이터 로딩 실패:", err));
  };

  useEffect(() => {
    fetchData();
  }, [reload]);

  return (
    <div>
      <h2>📈 계측기 SPC 모니터링 화면</h2>
      <MeasurementForm onSaved={handleSaved} />
      <MeasurementList data={data} reloadTrigger={reload} /> {/* ✅ 목록에도 전달 */}
      <MeasurementChart data={data} />
    </div>
  );
}

export default MonitoringPage;