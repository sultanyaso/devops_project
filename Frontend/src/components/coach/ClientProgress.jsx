import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TrendingUp, Target, CheckCircle, AlertCircle } from 'lucide-react';

export default function ClientProgress({ clients }) {
  const [selectedClient, setSelectedClient] = useState(null);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Client Progress Tracking</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {clients.map((client) => (
          <div
            key={client.id}
            className="border rounded-lg p-4 hover:border-indigo-500 transition-colors cursor-pointer"
            onClick={() => setSelectedClient(client)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={client.imageUrl}
                  alt={client.name}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{client.name}</h3>
                  <p className="text-sm text-gray-500">{client.goal}</p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-sm ${
                client.status === 'on-track' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {client.status === 'on-track' ? 'On Track' : 'Needs Attention'}
              </div>
            </div>
            
            <div className="space-y-3">
              <ProgressItem
                icon={Target}
                label="Goal Progress"
                value={`${client.progress}%`}
                color="text-indigo-600"
              />
              <ProgressItem
                icon={CheckCircle}
                label="Tasks Completed"
                value={`${client.tasksCompleted}/${client.totalTasks}`}
                color="text-green-600"
              />
              <ProgressItem
                icon={AlertCircle}
                label="Action Items"
                value={client.actionItems}
                color="text-yellow-600"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressItem({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Icon className={`h-4 w-4 ${color}`} />
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );
}

ClientProgress.propTypes = {
  clients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      goal: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['on-track', 'needs-attention']).isRequired,
      progress: PropTypes.number.isRequired,
      tasksCompleted: PropTypes.number.isRequired,
      totalTasks: PropTypes.number.isRequired,
      actionItems: PropTypes.number.isRequired,
    })
  ).isRequired,
};

ProgressItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};