import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth/authContext";

export default function LinkedInCallback() {
  const navigate = useNavigate();
  const { loginWithLinkedIn } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const state = urlParams.get("state");

        console.log("LinkedIn callback code:", code);

        if (!code) {
          throw new Error("No code received from LinkedIn");
        }

        await loginWithLinkedIn(code);
        navigate("/student-dashboard");
      } catch (error) {
        console.error("LinkedIn authentication error:", error);
        navigate("/", { state: { error: "LinkedIn authentication failed" } });
      }
    };

    handleCallback();
  }, [loginWithLinkedIn, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">
          Authenticating with LinkedIn
        </h2>
        <p className="text-gray-600">Please wait...</p>
      </div>
    </div>
  );
}
