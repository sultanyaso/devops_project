import React from 'react';
import { Linkedin, ArrowRight } from 'lucide-react';
import { getLinkedInAuthUrl } from '../../services/linkedinAuth';

export default function LinkedInPrompt() {
  const handleConnect = () => {
    window.location.href = getLinkedInAuthUrl();
  };

  return (
    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Linkedin className="h-6 w-6 text-blue-600" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-blue-800">
            Connect Your LinkedIn Account
          </h3>
          <div className="mt-2 text-sm text-blue-700">
            <p>
              Connect your LinkedIn account to unlock powerful features:
            </p>
            <ul className="mt-1 ml-4 list-disc">
              <li>Automated network analysis</li>
              <li>Profile engagement tracking</li>
              <li>Content performance metrics</li>
            </ul>
          </div>
          <div className="mt-4">
            <button
              onClick={handleConnect}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Connect LinkedIn
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}