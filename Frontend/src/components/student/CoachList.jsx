import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { UserCircle, Calendar, Star } from "lucide-react";
import coachService from "../../services/coachService";

export default function CoachList({ onSelectCoach }) {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCoaches() {
      try {
        const response = await coachService.getCoaches();
        setCoaches(response);
      } catch (err) {
        setError("Failed to load coaches");
      } finally {
        setLoading(false);
      }
    }
    fetchCoaches();
  }, []);

  if (loading) return <div>Loading coaches...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">
        Select a Career Coach
      </h2>
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
                <h3 className="text-lg font-medium text-gray-900">
                  {coach.name}
                </h3>
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