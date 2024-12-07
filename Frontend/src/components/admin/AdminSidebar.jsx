import React from 'react';
import PropTypes from 'prop-types';

export default function AdminSidebar({ modules, activeModule, onModuleChange }) {
  return (
    <aside className="w-64 bg-white shadow-sm min-h-screen">
      <nav className="mt-8 space-y-1 px-2">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <button
              key={module.id}
              onClick={() => onModuleChange(module.id)}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                activeModule === module.id
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`mr-3 h-5 w-5 ${
                activeModule === module.id ? 'text-indigo-500' : 'text-gray-400'
              }`} />
              {module.name}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

AdminSidebar.propTypes = {
  modules: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
    })
  ).isRequired,
  activeModule: PropTypes.string.isRequired,
  onModuleChange: PropTypes.func.isRequired,
};