import React from 'react';
import PropTypes from 'prop-types';
import { Calendar, Clock, User } from 'lucide-react';
import { format } from 'date-fns';

export default function SessionsList({ sessions, userRole }) {
  if (!sessions.length) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No scheduled sessions yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="bg-white rounded-lg shadow p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img
                  src={userRole === 'coach' ? session.student.imageUrl : session.coach.imageUrl}
                  alt={userRole === 'coach' ? session.student.name : session.coach.name}
                  className="h-10 w-10 rounded-full"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {userRole === 'coach' ? session.student.name : session.coach.name}
                </h3>
                <p className="text-sm text-gray-500">{session.topic}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                {format(new Date(session.date), 'MMM dd, yyyy')}
              </div>
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <Clock className="h-4 w-4 mr-1" />
                {session.time}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

SessionsList.propTypes = {
  sessions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      topic: PropTypes.string.isRequired,
      coach: PropTypes.shape({
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
      }).isRequired,
      student: PropTypes.shape({
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  userRole: PropTypes.oneOf(['coach', 'student']).isRequired,
};