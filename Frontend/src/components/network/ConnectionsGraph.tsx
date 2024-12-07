import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ConnectionsGraphProps {
  data: Array<{
    date: string;
    connections: number;
  }>;
}

export default function ConnectionsGraph({ data }: ConnectionsGraphProps) {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short' })}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem', padding: '1rem' }}
            labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { 
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          />
          <Line
            type="monotone"
            dataKey="connections"
            stroke="#4F46E5"
            strokeWidth={2}
            dot={{ fill: '#4F46E5', strokeWidth: 2 }}
            activeDot={{ r: 6, fill: '#4F46E5' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}