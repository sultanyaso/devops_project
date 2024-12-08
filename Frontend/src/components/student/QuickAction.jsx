import React from 'react';
import PropTypes from 'prop-types';

export default function QuickAction({ title, description, icon: Icon, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-6 text-left hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <div>
        <span className="inline-flex items-center justify-center rounded-md bg-gray-50 p-3">
          <Icon className="h-6 w-6 text-gray-700" />
        </span>
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </button>
  );
}

QuickAction.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  onClick: PropTypes.func,
};