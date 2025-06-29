import React, { useEffect, useState } from "react";
import axios from "axios";
import './DeviceManagementPage.css'; // 스타일은 필요시 생성
import DeviceList from "../../components/Device/DeviceList";
import DeviceForm from "../../components/Device/DeviceForm";

function DeviceManagementPage() {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null); // 수정할 계측기

  // 목록 불러오기
  const fetchDevices = () => {
    axios
      .get("/api/devices")
      .then((res) => setDevices(res.data))
      .catch((err) => console.error("계측기 불러오기 실패:", err));
  };

  // 등록 또는 수정 저장
  const handleSave = (device) => {
    if (selectedDevice) {
      // 수정
      axios
        .put(`/api/devices/${selectedDevice.id}`, device)
        .then(() => {
          fetchDevices();
          setSelectedDevice(null);
        })
        .catch((err) => {
          console.error("수정 실패:", err);
          alert("수정 실패");
        });
    } else {
      // 신규 등록
      console.log("신규등록 device::", device);
      axios
        .post("/api/devices", device)
        .then(() => {
          fetchDevices();
        })
        .catch((err) => {
          console.error("등록 실패:", err);
          alert("등록 실패");
        });
    }
  };

  // 삭제
  const handleDelete = (deviceId) => {
    console.log("신규등록 device::", deviceId);
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .delete(`/api/devices/${deviceId}`)
        .then(() => fetchDevices())
        .catch((err) => {
          console.error("삭제 실패:", err);
          alert("삭제 실패");
        });
    }
  };

  const handleEdit = (device) => {
    setSelectedDevice(device);
  };

  const handleCancelEdit = () => {
    setSelectedDevice(null);
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    <div>
      <h2>🛠 계측기 관리</h2>
      <DeviceForm
        selectedDevice={selectedDevice}
        onSubmit={handleSave}
        onCancel={handleCancelEdit}
      />
      <hr />
      <DeviceList
        devices={devices}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default DeviceManagementPage;