import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, UserCheck, AlertTriangle, CheckCircle } from 'lucide-react';

const data = [
  { name: 'Mon', users: 120, posts: 240, sessions: 180 },
  { name: 'Tue', users: 150, posts: 290, sessions: 200 },
  { name: 'Wed', users: 180, posts: 320, sessions: 250 },
  { name: 'Thu', users: 190, posts: 280, sessions: 220 },
  { name: 'Fri', users: 210, posts: 310, sessions: 260 },
  { name: 'Sat', users: 170, posts: 250, sessions: 190 },
  { name: 'Sun', users: 140, posts: 230, sessions: 170 },
];

const stats = [
  { name: 'Total Users', value: '12,345', change: '+12%', icon: Users },
  { name: 'Active Users', value: '8,901', change: '+8%', icon: UserCheck },
  { name: 'Content Flags', value: '234', change: '-5%', icon: AlertTriangle },
  { name: 'Success Rate', value: '94%', change: '+2%', icon: CheckCircle },
];

function StatCard({ stat }) {
  const Icon = stat.icon;
  const isPositive = stat.change.startsWith('+');
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="p-3 rounded-lg bg-indigo-50">
          <Icon className="h-6 w-6 text-indigo-600" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{stat.name}</p>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            <p className={`ml-2 text-sm font-medium ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Analytics() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.name} stat={stat} />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Platform Activity</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#4F46E5" />
              <Line type="monotone" dataKey="posts" stroke="#10B981" />
              <Line type="monotone" dataKey="sessions" stroke="#F59E0B" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Engagement Metrics</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="posts" fill="#4F46E5" />
              <Bar dataKey="sessions" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}