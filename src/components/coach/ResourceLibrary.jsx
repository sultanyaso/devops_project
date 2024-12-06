import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Book, FileText, Video, Link as LinkIcon, Plus, Share2 } from 'lucide-react';

export default function ResourceLibrary({ resources }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Resources', icon: Book },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'videos', name: 'Videos', icon: Video },
    { id: 'links', name: 'Links', icon: LinkIcon },
  ];

  const filteredResources = resources.filter(
    resource => selectedCategory === 'all' || resource.type === selectedCategory
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Resource Library</h2>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Resource
        </button>
      </div>

      <div className="flex space-x-4 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center px-4 py-2 rounded-md ${
              selectedCategory === category.id
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <category.icon className="h-4 w-4 mr-2" />
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map((resource) => (
          <div
            key={resource.id}
            className="border rounded-lg p-4 hover:border-indigo-500 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  {resource.type === 'documents' && <FileText className="h-5 w-5 text-indigo-600" />}
                  {resource.type === 'videos' && <Video className="h-5 w-5 text-indigo-600" />}
                  {resource.type === 'links' && <LinkIcon className="h-5 w-5 text-indigo-600" />}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{resource.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{resource.description}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <span>Added {resource.dateAdded}</span>
                    <span className="mx-2">•</span>
                    <span>{resource.size}</span>
                  </div>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

ResourceLibrary.propTypes = {
  resources: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['documents', 'videos', 'links']).isRequired,
      dateAdded: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
    })
  ).isRequired,
};