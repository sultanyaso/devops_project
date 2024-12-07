import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function LinkedInCallback() {
  const navigate = useNavigate();
  const { loginWithLinkedIn } = useAuth();
  const hasRun = useRef(false);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const state = urlParams.get("state");

        
        if (!code) {
          throw new Error("No code received from LinkedIn");
        }
        
        console.log("LinkedIn callback code:", code);
        console.log("LinkedIn callback state:", state);

        await loginWithLinkedIn(code);
        navigate('/');

        
      } catch (error) {
        console.error("LinkedIn authentication error:", error);
        navigate("/", { state: { error: "LinkedIn authentication failed" } });
      }
    };

    if (!hasRun.current) {
      handleCallback();
      hasRun.current = true;
    }
  });

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
