import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { Bot, Users, LineChart, Calendar, LogOut } from "lucide-react";
import PostGenerator from "../components/student/PostGenerator";
import CoachList from "../components/student/CoachList";
import SessionScheduler from "../components/student/SessionScheduler";
import SessionsList from "../components/student/SessionsList";
import NetworkStats from "../components/student/NetworkStats";
import NetworkAnalysisModal from "../components/student/network/NetworkAnalysisModal";
import LinkedInPrompt from "../components/student/LinkedInPrompt";
import QuickAction from "../components/student/QuickAction";
import { sessionService } from "../services/sessionService";
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
    const loadData = async () => {
      try {
        console.log("user", user);
        setError(null);
        const sessions = await sessionService.getSessionsByUser(
          user?.id,
          "student"
        );
        setSessions(sessions || []);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        setError("Failed to load some dashboard data. Please try refreshing.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadData();
    }
  }, [user]);

  const handleScheduleSession = async (sessionData) => {
    try {
      console.log("session dataa", sessionData);
      await sessionService.createSession(sessionData);
      setSelectedCoach(null);
      const updatedSessions = await sessionService.getSessionsByUser(
        user.id,
        "student"
      );
      setSessions(updatedSessions);
    } catch (error) {
      console.error("Error scheduling session:", error);
      setError("Failed to schedule session. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">
                Student Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">{user?.email}</span>
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
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
          <div className="mb-4 bg-red-900 border-l-4 border-red-500 p-4">
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
                <p className="text-sm text-red-300">{error}</p>
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
          <h2 className="text-lg font-medium text-white mb-4">
            Upcoming Sessions
          </h2>
          <SessionsList sessions={sessions} />
        </div>

        {showPostGenerator && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="flex min-h-screen items-center justify-center p-4">
              <div className="relative w-full max-w-2xl bg-gray-900 rounded-lg shadow-xl">
                <PostGenerator />
                <button
                  onClick={() => setShowPostGenerator(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        )}

        {showCoachList && !selectedCoach && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="flex min-h-screen items-center justify-center p-4">
              <div className="relative w-full max-w-2xl bg-gray-900 rounded-lg shadow-xl p-6">
                <CoachList onSelectCoach={setSelectedCoach} />
                <button
                  onClick={() => setShowCoachList(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedCoach && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="flex min-h-screen items-center justify-center p-4">
              <div className="relative w-full max-w-2xl bg-gray-900 rounded-lg shadow-xl">
                <SessionScheduler
                  coach={selectedCoach}
                  user={user}
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
