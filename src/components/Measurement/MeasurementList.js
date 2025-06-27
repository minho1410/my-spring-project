// src/components/MeasurementList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/**
 * 계측기 측정 데이터 리스트를 보여주는 컴포넌트
 */
function MeasurementList({ reloadTrigger }) {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);  // 수정 중인 ID
  const [editValue, setEditValue] = useState("");  // 수정할 값

  const navigate = useNavigate()

  useEffect(() => {
    fetchData();
  }, [reloadTrigger]);

  // 목록 조회
  const fetchData = () => {
    axios.get("/api/measurements")
      .then((res) => setData(res.data))
      .catch((err) => console.error("불러오기 실패:", err));
  };

  // 삭제 요청
  const handleDelete = async (id) => {
    console.log("삭제 시도 id:", id);  // 여기서 id 확인
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await axios.delete(`/api/measurements/${id}`);
        fetchData(); // 삭제 후 목록 다시 불러오기
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
      await axios.put(`/api/measurements/${editId}`, { value: editValue });
      setEditId(null);
      fetchData();
    } catch (err) {
      alert("수정 실패");
    }
  };

  // 수정 페이지 이동
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
              <td>{editId === m.id ? (<input value={editValue} onChange={(e) => setEditValue(e.target.value)} />) : (m.value)}</td>
              <td>{new Date(m.measureTime).toLocaleString()}</td>
              <td>{editId === m.id ? (<> <button onClick={saveEdit}>💾 저장 </button>
                <button onClick={cancelEdit}> ❌ 취소</button> </>) : (<>
                  <button onClick={() => goToEditPage(m.id)}>✏ 수정</button>
                  <button onClick={() => handleDelete(m.id)}>  🗑 삭제</button></>)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MeasurementList;