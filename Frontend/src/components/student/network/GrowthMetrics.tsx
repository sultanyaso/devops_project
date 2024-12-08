import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface GrowthMetricsProps {
  data: Array<{
    metric: string;
    current: number;
    previous: number;
  }>;
}

export default function GrowthMetrics({ data }: GrowthMetricsProps) {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="metric" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="current" name="Current Period" fill="#4F46E5" />
          <Bar dataKey="previous" name="Previous Period" fill="#93C5FD" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}