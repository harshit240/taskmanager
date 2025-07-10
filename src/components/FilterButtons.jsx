import React, { memo } from 'react';
import { Check, Filter } from 'lucide-react';
import { useTask } from '../context/TaskContext';

const FilterButtons = memo(() => {
  const { filter, setFilter, theme } = useTask();

  const buttons = [
    { key: 'all', label: 'All', icon: Filter },
    { key: 'pending', label: 'Pending', icon: Filter },
    { key: 'completed', label: 'Completed', icon: Check },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {buttons.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => setFilter(key)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            filter === key
              ? 'bg-blue-600 text-white scale-105'
              : theme === 'dark'
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Icon size={16} />
          {label}
        </button>
      ))}
    </div>
  );
});

export default FilterButtons;
