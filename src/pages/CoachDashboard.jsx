import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/auth/AuthContext';
import { Users, MessageSquare, LineChart, Calendar, LogOut, Award } from 'lucide-react';
import ScheduleView from '../components/coach/ScheduleView';
import ClientProgress from '../components/coach/ClientProgress';
import ResourceLibrary from '../components/coach/ResourceLibrary';
import { getSessionsByUser } from '../services/sessionService';

function StatCard({ title, value, change, icon: Icon }) {
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

export default function CoachDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('schedule');
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSessions();
  }, [user]);

  const loadSessions = async () => {
    if (user) {
      const userSessions = await getSessionsByUser(user.id, 'coach');
      setSessions(userSessions);
      setLoading(false);
    }
  };

  // Mock data for demonstration
  const mockClients = [
    {
      id: 1,
      name: "Sarah Wilson",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      goal: "Career Transition to Tech",
      status: "on-track",
      progress: 75,
      tasksCompleted: 8,
      totalTasks: 10,
      actionItems: 3,
    },
    {
      id: 2,
      name: "Michael Chen",
      imageUrl: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      goal: "Leadership Development",
      status: "needs-attention",
      progress: 45,
      tasksCompleted: 5,
      totalTasks: 12,
      actionItems: 5,
    },
  ];

  const mockResources = [
    {
      id: 1,
      title: "Career Transition Guide",
      description: "Comprehensive guide for career changers",
      type: "documents",
      dateAdded: "2 days ago",
      size: "2.4 MB",
    },
    {
      id: 2,
      title: "Interview Preparation",
      description: "Video series on mastering interviews",
      type: "videos",
      dateAdded: "1 week ago",
      size: "45 min",
    },
    {
      id: 3,
      title: "Industry Research Tools",
      description: "Curated list of research resources",
      type: "links",
      dateAdded: "3 days ago",
      size: "8 links",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'schedule':
        return <ScheduleView sessions={sessions} />;
      case 'progress':
        return <ClientProgress clients={mockClients} />;
      case 'resources':
        return <ResourceLibrary resources={mockResources} />;
      default:
        return <ScheduleView sessions={sessions} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard
            title="Active Clients"
            value="28"
            change="+3"
            icon={Users}
          />
          <StatCard
            title="Sessions This Week"
            value={sessions.length.toString()}
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

        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('schedule')}
                className={`${
                  activeTab === 'schedule'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Schedule
              </button>
              <button
                onClick={() => setActiveTab('progress')}
                className={`${
                  activeTab === 'progress'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Client Progress
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`${
                  activeTab === 'resources'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Resource Library
              </button>
            </nav>
          </div>
        </div>

        {renderContent()}
      </main>
    </div>
  );
}