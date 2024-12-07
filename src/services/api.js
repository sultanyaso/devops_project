import axios from "axios";

const api = axios.create({
  baseURL: "https://api.linkedin.com/v2",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchLinkedInProfile = async (accessToken) => {
  try {
    const response = await api.get("/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        projection:
          "(id,given_name,family_name,profilePicture(displayImage~:playableStreams),email)",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching LinkedIn profile:", error);
    throw error;
  }
};
