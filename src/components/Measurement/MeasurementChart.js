import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

function MeasurementChart({ data }) {
  const chartData = [...data]
    .sort((a, b) => new Date(a.measureTime) - new Date(b.measureTime))
    .map(item => ({
    time: new Date(item.measureTime).toLocaleTimeString(),
    value: item.value,
  }));

  return (
    <div>
      <h3>📊 실시간 측정 그래프</h3>
      <LineChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}

export default MeasurementChart; // ✅ 이 줄이 꼭 있어야 함