import React, { memo } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTask } from '../context/TaskContext';

const Header = memo(() => {
  const { theme, toggleTheme, taskStats } = useTask();

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
      theme === 'dark' ? 'bg-gray-900/90 border-gray-700' : 'bg-white/90 border-gray-200'
    }`}>
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Task Manager
            </h1>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {taskStats.total} tasks • {taskStats.completed} completed • {taskStats.pending} pending
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
              theme === 'dark'
                ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
});

export default Header;
