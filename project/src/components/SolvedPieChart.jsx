import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const SolvedPieChart = ({ data, loading }) => {
  if (loading) return <div>Loading chart...</div>;

  const chartData = [
    { name: 'Easy', value: data?.easy_solved || 0, color: '#238636' },
    { name: 'Medium', value: data?.medium_solved || 0, color: '#1f6feb' },
    { name: 'Hard', value: data?.hard_solved || 0, color: '#da3633' },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0];
      return (
        <div className="github-card p-3 shadow-lg border border-gh-border">
          <p className="font-semibold text-gh-text text-sm" style={{ color: d.payload.color }}>
            {d.name}: {d.value} problems
          </p>
          <p className="text-xs text-gh-text-secondary">
            {((d.value / chartData.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="github-card p-6">
      <h3 className="text-lg font-semibold text-gh-text mb-4">Problems by Difficulty</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ color: '#f0f6fc', fontSize: '12px' }} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 text-center pt-4 border-t border-gh-border">
        <p className="text-gh-text-secondary text-sm">
          Total: <span className="font-semibold text-gh-text">{data?.total_solved || 0}</span>
        </p>
      </div>
    </div>
  );
};

export default SolvedPieChart;
