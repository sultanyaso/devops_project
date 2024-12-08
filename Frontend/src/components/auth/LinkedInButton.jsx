import React from 'react';
import { Linkedin } from 'lucide-react';

export default function LinkedInButton() {

  const getLinkedInAuthUrl = () => {
    const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_LINKEDIN_REDIRECT_URI;
    const state = import.meta.env.VITE_LINKEDIN_STATE;
    const scope = 'openid profile email w_member_social';

    return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;
  }

  const handleLinkedInLogin = () => {
    const authUrl = getLinkedInAuthUrl();
    console.log('LinkedIn Auth URL:', authUrl);
    window.location.href = authUrl;
  };

  return (
    <button
      onClick={handleLinkedInLogin}
      className="w-full flex items-center justify-center gap-2 bg-[#0A66C2] text-white px-4 py-2 rounded-md hover:bg-[#004182] transition-colors"
    >
      <Linkedin className="h-5 w-5" />
      Continue with LinkedIn
    </button>
  );
}