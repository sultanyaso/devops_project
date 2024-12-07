import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { Bot, Users, LineChart, Calendar, LogOut } from "lucide-react";
import PostGenerator from "../components/post-generator/PostGenerator";
import CoachList from "../components/scheduling/CoachList";
import SessionScheduler from "../components/scheduling/SessionScheduler";
import SessionsList from "../components/scheduling/SessionsList";
import NetworkStats from "../components/dashboard/NetworkStats";
import NetworkAnalysisModal from "../components/network/NetworkAnalysisModal";
import LinkedInPrompt from "../components/linkedin/LinkedInPrompt";
import QuickAction from "../components/dashboard/QuickAction";
import { scheduleSession, getSessionsByUser } from "../services/sessionService";
import {
  getNetworkStats,
  isLinkedInConnected,
  getProfileData,
} from "../services/linkedinService";

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const [showPostGenerator, setShowPostGenerator] = useState(false);
  const [showCoachList, setShowCoachList] = useState(false);
  const [showNetworkAnalysis, setShowNetworkAnalysis] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [networkStats, setNetworkStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLinkedIn, setIsLinkedIn] = useState(false);
  const [error, setError] = useState(null);
  const [linkedInUser, setLinkedInUser] = useState({ name: "", email: "" });

  useEffect(() => {
    // const loadData = async () => {
    //   try {
    //     setError(null);
    //     const linkedInStatus = isLinkedInConnected();
    //     setIsLinkedIn(linkedInStatus);

    //     const [userSessions, stats, profileData] = await Promise.all([
    //       getSessionsByUser(user?.id, "student"),
    //       linkedInStatus ? getNetworkStats() : null,
    //       linkedInStatus ? getProfileData() : null,
    //     ]);

    //     setSessions(userSessions || []);
    //     setNetworkStats(stats);
    //     if (profileData) {
    //       console.log("Profile Data:", profileData);
    //       setLinkedInUser({
    //         name: `${profileData.given_name.localized.en_US} ${profileData.family_name.localized.en_US}`,
    //         email: profileData.email,
    //       });
    //     }
    //   } catch (error) {
    //     console.error("Error loading dashboard data:", error);
    //     setError("Failed to load some dashboard data. Please try refreshing.");
    //   } finally {
        setLoading(false);
    //   }
    // };

    // if (user) {
    //   loadData();
    // }
  }, [user]);

  const handleScheduleSession = async (sessionData) => {
    try {
      await scheduleSession({
        ...sessionData,
        student: {
          id: user.id,
          name: user.given_name + " " + user.family_name,
          imageUrl:
            user.profilePicture ||
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      });
      setSelectedCoach(null);
      const updatedSessions = await getSessionsByUser(user.id, "student");
      setSessions(updatedSessions);
    } catch (error) {
      console.error("Error scheduling session:", error);
      setError("Failed to schedule session. Please try again.");
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
              <h1 className="text-xl font-bold text-gray-900">
                Student Dashboard
              </h1>
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
        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {!isLinkedIn && <LinkedInPrompt />}

        {networkStats && <NetworkStats stats={networkStats} />}

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <QuickAction
            title="Generate New Post"
            description="Create an engaging LinkedIn post with AI assistance"
            icon={Bot}
            onClick={() => setShowPostGenerator(true)}
          />
          <QuickAction
            title="Schedule Coaching"
            description="Book a session with a career coach"
            icon={Calendar}
            onClick={() => setShowCoachList(true)}
          />
          <QuickAction
            title="Network Analysis"
            description="Get insights about your professional network"
            icon={Users}
            onClick={() => setShowNetworkAnalysis(true)}
          />
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Upcoming Sessions
          </h2>
          <SessionsList sessions={sessions} userRole="student" />
        </div>

        {showPostGenerator && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
              <div
                className="fixed inset-0 bg-black bg-opacity-25"
                onClick={() => setShowPostGenerator(false)}
              />
              <div className="relative w-full max-w-2xl">
                <PostGenerator />
                <button
                  onClick={() => setShowPostGenerator(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        )}

        {showCoachList && !selectedCoach && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
              <div
                className="fixed inset-0 bg-black bg-opacity-25"
                onClick={() => setShowCoachList(false)}
              />
              <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl p-6">
                <CoachList onSelectCoach={setSelectedCoach} />
                <button
                  onClick={() => setShowCoachList(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedCoach && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
              <div
                className="fixed inset-0 bg-black bg-opacity-25"
                onClick={() => setSelectedCoach(null)}
              />
              <div className="relative w-full max-w-2xl">
                <SessionScheduler
                  coach={selectedCoach}
                  onSchedule={handleScheduleSession}
                  onClose={() => setSelectedCoach(null)}
                />
              </div>
            </div>
          </div>
        )}

        <NetworkAnalysisModal
          isOpen={showNetworkAnalysis}
          onClose={() => setShowNetworkAnalysis(false)}
        />
      </main>
    </div>
  );
}
