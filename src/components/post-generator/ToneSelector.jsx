import React from 'react';
import PropTypes from 'prop-types';
import { MessageCircle, Briefcase, Zap, Users } from 'lucide-react';

const tones = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Formal and business-oriented',
    icon: Briefcase,
  },
  {
    id: 'casual',
    name: 'Casual',
    description: 'Friendly and approachable',
    icon: MessageCircle,
  },
  {
    id: 'enthusiastic',
    name: 'Enthusiastic',
    description: 'Energetic and inspiring',
    icon: Zap,
  },
  {
    id: 'storytelling',
    name: 'Storytelling',
    description: 'Narrative and engaging',
    icon: Users,
  },
];

export default function ToneSelector({ selected, onSelect }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select tone
      </label>
      <div className="grid grid-cols-2 gap-4">
        {tones.map((tone) => {
          const Icon = tone.icon;
          return (
            <button
              key={tone.id}
              onClick={() => onSelect(tone.id)}
              className={`flex items-center p-3 rounded-lg border ${
                selected === tone.id
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Icon className={`h-5 w-5 ${
                selected === tone.id ? 'text-indigo-600' : 'text-gray-400'
              }`} />
              <div className="ml-3 text-left">
                <h3 className="text-sm font-medium text-gray-900">{tone.name}</h3>
                <p className="text-xs text-gray-500">{tone.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

ToneSelector.propTypes = {
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};