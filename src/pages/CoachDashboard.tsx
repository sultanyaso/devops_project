import React from 'react';
import { useAuth } from '../contexts/auth/authContext';
import { Users, MessageSquare, LineChart, Calendar, LogOut, Award } from 'lucide-react';

export default function CoachDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Coach Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{user?.email}</span>
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Active Clients"
            value="28"
            change="+3"
            icon={Users}
          />
          <StatCard
            title="Sessions This Week"
            value="12"
            change="+4"
            icon={MessageSquare}
          />
          <StatCard
            title="Client Success Rate"
            value="92%"
            change="+5%"
            icon={Award}
          />
          <StatCard
            title="Upcoming Sessions"
            value="8"
            change="+2"
            icon={Calendar}
          />
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <QuickAction
            title="Schedule Session"
            description="Book a new coaching session with a client"
            icon={Calendar}
          />
          <QuickAction
            title="Client Progress"
            description="Review and update client progress tracking"
            icon={LineChart}
          />
          <QuickAction
            title="Resource Library"
            description="Manage and share career resources with clients"
            icon={Award}
          />
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, change, icon: Icon }: {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
}) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon className="h-6 w-6 text-gray-400" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">{value}</div>
                <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                  {change}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickAction({ title, description, icon: Icon }: {
  title: string;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <button className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-6 text-left hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
      <div>
        <span className="inline-flex items-center justify-center rounded-md bg-gray-50 p-3">
          <Icon className="h-6 w-6 text-gray-700" />
        </span>
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </button>
  );
}