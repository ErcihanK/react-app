import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', activity: 40 },
  { name: 'Tue', activity: 30 },
  { name: 'Wed', activity: 20 },
  { name: 'Thu', activity: 27 },
  { name: 'Fri', activity: 18 },
  { name: 'Sat', activity: 23 },
  { name: 'Sun', activity: 34 },
];

const ActivityChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="activity" stroke="#ff4081" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ActivityChart;
