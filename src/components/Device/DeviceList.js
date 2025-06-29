import React from "react";

function DeviceList({ devices, onEdit, onDelete }) {
  return (
    <div>
      <h3>📋 계측기 목록</h3>
      <table>
        <thead>
          <tr>
            <th>계측기 ID</th>
            <th>계측기 이름</th>  {/* 새 필드 추가 */}
            <th>설명</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {devices.map(device => (
            <tr key={device.id}>
              <td>{device.deviceId}</td>
              <td>{device.deviceName}</td>  {/* 새 필드 출력 */}
              <td>{device.description}</td>
              <td>
                <button onClick={() => onEdit(device)}>✏ 수정</button>
                <button onClick={() => onDelete(device.deviceId)}>🗑 삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DeviceList;