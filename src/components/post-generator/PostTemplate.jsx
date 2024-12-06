import React from 'react';
import PropTypes from 'prop-types';
import { Trophy, Lightbulb, BookOpen, Rocket } from 'lucide-react';

const templates = [
  {
    id: 'achievement',
    name: 'Achievement',
    description: 'Share a professional accomplishment',
    icon: Trophy,
  },
  {
    id: 'insight',
    name: 'Industry Insight',
    description: 'Share knowledge or industry trends',
    icon: Lightbulb,
  },
  {
    id: 'learning',
    name: 'Learning Experience',
    description: 'Share what you learned recently',
    icon: BookOpen,
  },
  {
    id: 'project',
    name: 'Project Showcase',
    description: 'Highlight a project or case study',
    icon: Rocket,
  },
];

export default function PostTemplate({ selected, onSelect }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Choose a template
      </label>
      <div className="grid grid-cols-2 gap-4">
        {templates.map((template) => {
          const Icon = template.icon;
          return (
            <button
              key={template.id}
              onClick={() => onSelect(template.id)}
              className={`flex flex-col items-center p-4 rounded-lg border-2 ${
                selected === template.id
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Icon className={`h-6 w-6 ${
                selected === template.id ? 'text-indigo-600' : 'text-gray-400'
              }`} />
              <h3 className="mt-2 font-medium text-gray-900">{template.name}</h3>
              <p className="mt-1 text-xs text-gray-500">{template.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

PostTemplate.propTypes = {
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};