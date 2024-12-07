import React from 'react';
import { Linkedin } from 'lucide-react';

export default function LinkedInButton() {
  const handleLinkedInLogin = () => {
    // const authUrl = getLinkedInAuthUrl();
    // console.log('LinkedIn Auth URL:', authUrl);
    // window.location.href = authUrl;
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