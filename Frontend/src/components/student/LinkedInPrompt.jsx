import React from "react";
import { Linkedin, ArrowRight } from 'lucide-react';
import LinkedInButton from "../auth/LinkedInButton";

export default function LinkedInPrompt() {
  return (
    <div className="bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Linkedin className="h-6 w-6 text-blue-400" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-blue-300">
            Connect Your LinkedIn Account
          </h3>
          <div className="mt-2 text-sm text-blue-200">
            <p>Connect your LinkedIn account to unlock powerful features:</p>
            <ul className="mt-1 ml-4 list-disc">
              <li>Automated network analysis</li>
              <li>Profile engagement tracking</li>
              <li>Content performance metrics</li>
            </ul>
          </div>
          <div className="mt-4">
            <LinkedInButton />
          </div>
        </div>
      </div>
    </div>
  );
}

