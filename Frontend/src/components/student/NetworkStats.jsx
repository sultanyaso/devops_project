import React from 'react';
import PropTypes from 'prop-types';
import { Users, TrendingUp, MessageSquare, Eye } from 'lucide-react';

function StatCard({ title, value, change, icon: Icon, description }) {
  const isPositive = change?.startsWith('+');
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="p-3 bg-indigo-50 rounded-lg">
          <Icon className="h-6 w-6 text-indigo-600" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <div className="mt-1">
            <span className="text-2xl font-semibold text-gray-900">{value}</span>
            {change && (
              <span className={`ml-2 text-sm font-medium ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {change}
              </span>
            )}
          </div>
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.string,
  icon: PropTypes.elementType.isRequired,
  description: PropTypes.string,
};

export default function NetworkStats({ stats }) {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Network Size"
        value={stats.connections}
        change={stats.connectionGrowth}
        icon={Users}
        description="Total connections"
      />
      <StatCard
        title="Profile Views"
        value={stats.profileViews}
        change={stats.viewsGrowth}
        icon={Eye}
        description="Last 90 days"
      />
      <StatCard
        title="Post Engagement"
        value={stats.engagement}
        change={stats.engagementGrowth}
        icon={TrendingUp}
        description="Average engagement rate"
      />
      <StatCard
        title="Messages"
        value={stats.messages}
        change={stats.messageGrowth}
        icon={MessageSquare}
        description="Response rate"
      />
    </div>
  );
}

NetworkStats.propTypes = {
  stats: PropTypes.shape({
    connections: PropTypes.string.isRequired,
    connectionGrowth: PropTypes.string,
    profileViews: PropTypes.string.isRequired,
    viewsGrowth: PropTypes.string,
    engagement: PropTypes.string.isRequired,
    engagementGrowth: PropTypes.string,
    messages: PropTypes.string.isRequired,
    messageGrowth: PropTypes.string,
  }),
};