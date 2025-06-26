// pages/MonitoringPage.js
import React, { useState } from "react";
import MeasurementForm from "../components/MeasurementForm";
import MeasurementList from "../components/MeasurementList";

function MonitoringPage() {
  const [reload, setReload] = useState(false);

  const handleSaved = () => setReload(!reload);

  return (
    <div>
      <h2>📈 계측기 SPC 모니터링 화면</h2>
      <MeasurementForm onSaved={handleSaved} />
      <MeasurementList reloadTrigger={reload} />
    </div>
  );
}

export default MonitoringPage;