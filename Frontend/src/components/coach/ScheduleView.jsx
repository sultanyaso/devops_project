import React  from "react";
import PropTypes from "prop-types";
import { Clock, Video, Check } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

export default function ScheduleView({ sessions, onConfirm }) {
  const [status, setStatus] = useState(sessions.status);
  
  const groupSessionsByDate = (sessions) => {
    return sessions.reduce((acc, session) => {
      const date = format(new Date(session.date), "yyyy-MM-dd");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(session);
      return acc;
    }, {});
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const groupedSessions = groupSessionsByDate(sessions);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Upcoming Sessions
      </h2>

      {Object.entries(groupedSessions).map(([date, daySessions]) => (
        <div key={date} className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {format(new Date(date), "EEEE, MMMM d")}
          </h3>

          <div className="space-y-4">
            {daySessions.map((session) => (
              <div
                key={session._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {session.title}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                          session.status
                        )}`}
                      >
                        {session.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{session.time}</span>
                    <span className="text-sm ml-2">
                      ({session.duration} min)
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {session.status === "pending" && (
                      <button
                        onClick={() => onConfirm(session._id)}
                        className="flex items-center px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Confirm
                      </button>
                    )}
                    <button
                      className={`flex items-center px-3 py-1 ${
                        session.status === "pending"
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                          : "bg-gray-300 cursor-not-allowed"
                      } rounded-md`}
                      disabled={session.status !== "pending"}
                    >
                      <Video className="h-4 w-4 mr-1" />
                      Join Call
                    </button>
                  </div>
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
      _id: PropTypes.string.isRequired,
      studentUserId: PropTypes.string.isRequired,
      coachUserId: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      status: PropTypes.oneOf(["pending", "completed", "cancelled"]).isRequired,
      duration: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  onConfirm: PropTypes.func.isRequired,
};
