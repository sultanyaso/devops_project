import React from 'react';
import PropTypes from 'prop-types';
import { Users, TrendingUp, Building, MessageSquare } from 'lucide-react';

function StatCard({ title, value, change, icon: Icon, description }) {
  const isPositive = !change?.startsWith('-');
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className="p-3 bg-indigo-50 rounded-lg">
            <Icon className="h-6 w-6 text-indigo-600" />
          </div>
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
          <p className="mt-1 text-sm text-gray-500">{description}</p>
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
  description: PropTypes.string.isRequired,
};

export default function NetworkAnalysis({ networkStats }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="Network Size"
          value={networkStats.connections}
          change={networkStats.connectionGrowth}
          icon={Users}
          description="Total professional connections"
        />
        <StatCard
          title="Profile Views"
          value={networkStats.profileViews}
          change={networkStats.viewsGrowth}
          icon={TrendingUp}
          description="Views in the last 30 days"
        />
        <StatCard
          title="Company Reach"
          value={networkStats.companyConnections}
          icon={Building}
          description="Connections across companies"
        />
        <StatCard
          title="Engagement Rate"
          value={networkStats.engagementRate}
          change={networkStats.engagementGrowth}
          icon={MessageSquare}
          description="Average engagement on your posts"
        />
      </div>
    </div>
  );
}

NetworkAnalysis.propTypes = {
  networkStats: PropTypes.shape({
    connections: PropTypes.string.isRequired,
    connectionGrowth: PropTypes.string,
    profileViews: PropTypes.string.isRequired,
    viewsGrowth: PropTypes.string,
    companyConnections: PropTypes.string.isRequired,
    engagementRate: PropTypes.string.isRequired,
    engagementGrowth: PropTypes.string,
  }).isRequired,
};