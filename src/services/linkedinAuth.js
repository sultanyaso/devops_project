import axios from "axios";
import { LINKEDIN_CONFIG } from "../config/linkedin";

const LINKEDIN_CLIENT_ID = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = import.meta.env.VITE_LINKEDIN_CLIENT_SECRET;
const REDIRECT_URI = import.meta.env.VITE_LINKEDIN_REDIRECT_URI;

export const getLinkedInAuthUrl = () => {
  const scope = "profile email w_member_social";

  return (
    `https://www.linkedin.com/oauth/v2/authorization?` +
    `response_type=code&` +
    `client_id=${LINKEDIN_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
    `state=${generateRandomString()}&` +
    `scope=${encodeURIComponent(scope)}`
  );
};

// Helper function to generate random state
function generateRandomString() {
  return Math.random().toString(36).substring(7);
}

export async function exchangeCodeForToken(code) {
  try {
    const response = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      null,
      {
        params: {
          grant_type: "authorization_code",
          code,
          client_id: LINKEDIN_CONFIG.clientId,
          client_secret: LINKEDIN_CONFIG.clientSecret,
          redirect_uri: LINKEDIN_CONFIG.redirectUri,
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error exchanging code for token:", error);
    throw error;
  }
}

export async function handleLinkedInCallback(code) {
  try {
    const accessToken = await exchangeCodeForToken(code);
    const profile = await fetchLinkedInProfile(accessToken);

    localStorage.setItem("linkedinAccessToken", accessToken);

    localStorage.setItem("linkedinAccessToken", accessToken);

    const userData = {
      id: profile.id,
      firstName: profile.firstName.localized.en_US,
      lastName: profile.lastName.localized.en_US,
      email: profile.emailAddress,
      profilePicture: profile.profilePicture?.["displayImage~"]?.elements[0]?.identifiers[0]?.identifier,
      accessToken,
    };

    const user = await createOrUpdateLinkedInUser(userData);
    return user;
  } catch (error) {
    console.error("LinkedIn auth error:", error);
    throw error;
  }
}

export async function fetchLinkedInUserData(accessToken) {
  const response = await fetch("http://localhost:5000/api/linkedin/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  return await response.json();
}
