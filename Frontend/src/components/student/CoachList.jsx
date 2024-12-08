import React from 'react';
import PropTypes from 'prop-types';
import { UserCircle, Calendar, Star } from 'lucide-react';

export default function CoachList({ onSelectCoach }) {
  // Simulated coaches data
  const coaches = [
    {
      id: 1,
      name: "Sarah Johnson",
      expertise: "Career Transition, Tech Industry",
      rating: 4.9,
      yearsExperience: 8,
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: 2,
      name: "Michael Chen",
      expertise: "Leadership Development, Startup Growth",
      rating: 4.8,
      yearsExperience: 10,
      imageUrl: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Select a Career Coach</h2>
      <div className="grid gap-4">
        {coaches.map((coach) => (
          <div
            key={coach.id}
            className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-4">
              <img
                src={coach.imageUrl}
                alt={coach.name}
                className="h-12 w-12 rounded-full"
              />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{coach.name}</h3>
                <p className="text-sm text-gray-500">{coach.expertise}</p>
                <div className="mt-2 flex items-center space-x-4 text-sm">
                  <span className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 mr-1" />
                    {coach.rating}
                  </span>
                  <span className="text-gray-500">
                    {coach.yearsExperience} years experience
                  </span>
                </div>
              </div>
              <button
                onClick={() => onSelectCoach(coach)}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

CoachList.propTypes = {
  onSelectCoach: PropTypes.func.isRequired,
};