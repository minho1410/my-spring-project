import React, { useState, useEffect } from "react";

function DeviceForm({ selectedDevice, onSubmit, onCancel }) {
  const [deviceId, setDeviceId] = useState("");
  const [deviceName, setDeviceName] = useState("");  // 추가
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (selectedDevice) {
      setDeviceId(selectedDevice.deviceId);
      setDeviceName(selectedDevice.deviceName || ""); // 추가
      setDescription(selectedDevice.description || "");
    } else {
      setDeviceId("");
      setDeviceName(""); // 추가
      setDescription("");
    }
  }, [selectedDevice]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!deviceId.trim()) {
      alert("계측기 ID는 필수입니다.");
      return;
    }
    if (!deviceName.trim()) {
      alert("계측기 이름은 필수입니다."); // 추가
      return;
    }
    onSubmit({ deviceId, deviceName, description }); // deviceName 포함해서 전달
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{selectedDevice ? "🛠 계측기 수정" : "➕ 계측기 등록"}</h3>
      <input
        type="text"
        placeholder="계측기 ID"
        value={deviceId}
        onChange={(e) => setDeviceId(e.target.value)}
        disabled={!!selectedDevice}
      />
      <input
        type="text"
        placeholder="계측기 이름"  // 추가
        value={deviceName}
        onChange={(e) => setDeviceName(e.target.value)}
      />
      <input
        type="text"
        placeholder="설명"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">저장</button>
      {selectedDevice && <button type="button" onClick={onCancel}>취소</button>}
    </form>
  );
}

export default DeviceForm;