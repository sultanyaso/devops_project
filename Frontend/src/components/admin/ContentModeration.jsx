import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Flag, MessageSquare, ThumbsUp } from 'lucide-react';

const reports = [
  {
    id: 1,
    type: 'post',
    content: 'This is a reported post content...',
    reporter: 'John Doe',
    reason: 'Inappropriate content',
    status: 'pending',
    date: '2024-03-01',
    flags: 3,
  },
  {
    id: 2,
    type: 'comment',
    content: 'This is a reported comment...',
    reporter: 'Jane Smith',
    reason: 'Spam',
    status: 'reviewed',
    date: '2024-03-02',
    flags: 5,
  },
];

function ReportCard({ report }) {
  const [showActions, setShowActions] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-green-100 text-green-800';
      case 'flagged':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'post':
        return <MessageSquare className="h-5 w-5" />;
      case 'comment':
        return <ThumbsUp className="h-5 w-5" />;
      default:
        return <Flag className="h-5 w-5" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            {getTypeIcon(report.type)}
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 capitalize">{report.type}</h3>
            <p className="text-sm text-gray-500">Reported by {report.reporter}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
          {report.status}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-gray-600">{report.content}</p>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <AlertTriangle className="h-4 w-4 mr-1" />
          <span>Reason: {report.reason}</span>
          <span className="mx-2">•</span>
          <Flag className="h-4 w-4 mr-1" />
          <span>{report.flags} flags</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Reported on {new Date(report.date).toLocaleDateString()}
        </span>
        
        <div className="flex space-x-2">
          <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
            <CheckCircle className="h-4 w-4 mr-1" />
            Approve
          </button>
          <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
            <XCircle className="h-4 w-4 mr-1" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ContentModeration() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Content Moderation</h2>
        
        <div className="flex space-x-2">
          {['all', 'pending', 'reviewed', 'flagged'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                filter === status
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {reports.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
    </div>
  );
}