import React from 'react';
import PropTypes from 'prop-types';
import { Calendar, Clock, User, Video } from 'lucide-react';
import { format } from 'date-fns';

export default function ScheduleView({ sessions }) {
  const groupSessionsByDate = (sessions) => {
    return sessions.reduce((acc, session) => {
      const date = format(new Date(session.date), 'yyyy-MM-dd');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(session);
      return acc;
    }, {});
  };

  const groupedSessions = groupSessionsByDate(sessions);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Sessions</h2>
      
      {Object.entries(groupedSessions).map(([date, daySessions]) => (
        <div key={date} className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {format(new Date(date), 'EEEE, MMMM d')}
          </h3>
          
          <div className="space-y-4">
            {daySessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      src={session.student.imageUrl}
                      alt={session.student.name}
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {session.student.name}
                    </h4>
                    <p className="text-sm text-gray-500">{session.topic}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{session.time}</span>
                  </div>
                  <button className="flex items-center px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    <Video className="h-4 w-4 mr-1" />
                    Join Call
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

ScheduleView.propTypes = {
  sessions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      topic: PropTypes.string.isRequired,
      student: PropTypes.shape({
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};