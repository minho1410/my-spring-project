// src/components/MeasurementList.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * 계측기 측정 데이터 리스트를 보여주는 컴포넌트
 */
function MeasurementList({ data, onReload }) {
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const navigate = useNavigate();

  // 삭제 요청
  const handleDelete = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await fetch(`/api/measurements/${id}`, { method: "DELETE" });
        onReload(); // 삭제 후 목록 새로고침
      } catch (err) {
        console.error("삭제 실패:", err);
        alert("삭제 중 오류 발생");
      }
    }
  };

  // 수정 취소
  const cancelEdit = () => {
    setEditId(null);
    setEditValue("");
  };

  // 수정 저장
  const saveEdit = async () => {
    try {
      await fetch(`/api/measurements/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: editValue }),
      });
      setEditId(null);
      setEditValue("");
      onReload(); // 저장 후 목록 새로고침
    } catch (err) {
      alert("수정 실패");
    }
  };

  const goToEditPage = (id) => {
    navigate(`/monitoring/edit/${id}`);
  };

  return (
    <div className="list">
      <h2>📈 측정값 목록</h2>
      <table>
        <thead>
          <tr>
            <th>계측기 ID</th>
            <th>측정값</th>
            <th>측정시각</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {data.map((m) => (
            <tr key={m.id}>
              <td>{m.deviceId}</td>
              <td>
                {editId === m.id ? (
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                ) : (
                  m.value
                )}
              </td>
              <td>{new Date(m.measureTime).toLocaleString()}</td>
              <td>
                {editId === m.id ? (
                  <>
                    <button onClick={saveEdit}>💾 저장</button>
                    <button onClick={cancelEdit}>❌ 취소</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => goToEditPage(m.id)}>✏ 수정</button>
                    <button onClick={() => handleDelete(m.id)}>🗑 삭제</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MeasurementList;