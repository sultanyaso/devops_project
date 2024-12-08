import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Hash } from 'lucide-react';
import { generateHashtags } from '../../utils/postGenerator';

export default function HashtagSuggestions({ topic }) {
  const [hashtags, setHashtags] = useState([]);

  useEffect(() => {
    // Simulated API call for hashtag suggestions
    const suggestions = generateHashtags(topic);
    setHashtags(suggestions);
  }, [topic]);

  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Suggested Hashtags</h4>
      <div className="flex flex-wrap gap-2">
        {hashtags.map((hashtag) => (
          <span
            key={hashtag}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
          >
            <Hash className="h-4 w-4 mr-1" />
            {hashtag}
          </span>
        ))}
      </div>
    </div>
  );
}

HashtagSuggestions.propTypes = {
  topic: PropTypes.string.isRequired,
};