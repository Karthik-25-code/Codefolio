import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ContestGraph = ({ data, platform, loading }) => {
  const getColor = (platform) => {
    return platform === 'leetcode' ? '#1f6feb' : '#238636';
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="github-card p-3 shadow-lg border border-gh-border">
          <p className="font-semibold text-gh-text text-sm">
            Contest {label}
          </p>
          <p className="text-sm" style={{ color: getColor(platform) }}>
            Rating: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="github-card p-6">
        <div className="h-80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gh-green"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="github-card p-6">
      <h3 className="text-lg font-semibold text-gh-text mb-4 capitalize">
        {platform} Contest Rating
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data?.contestRating || []}>
          <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
          <XAxis 
            dataKey="contest" 
            stroke="#8b949e"
            fontSize={12}
          />
          <YAxis 
            stroke="#8b949e"
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="rating"
            stroke={getColor(platform)}
            strokeWidth={2}
            dot={{ fill: getColor(platform), strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: getColor(platform), strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 text-center pt-4 border-t border-gh-border">
        <p className="text-gh-text-secondary text-sm">
          Current: <span className="font-semibold text-gh-text">{data?.rating || 'N/A'}</span>
        </p>
      </div>
    </div>
  );
};

export default ContestGraph;