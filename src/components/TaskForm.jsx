import React, { useState, useCallback, memo } from 'react';
import { Plus } from 'lucide-react';
import { useTask } from '../context/TaskContext';

const TaskForm = memo(() => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const { addTask, theme } = useTask();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return setError('Task cannot be empty');
    if (trimmed.length > 100) return setError('Task must be under 100 characters');

    addTask(trimmed);
    setText('');
    setError('');
  }, [text, addTask]);

  return (
    <div className="mb-6">
      <form className="flex gap-2 mb-2" onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setError('');
          }}
          placeholder="Add a new task..."
          maxLength={100}
          className={`flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          } ${error ? 'border-red-500' : ''}`}
        />
        <button type="submit" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
          <Plus size={20} />
        </button>
      </form>
      {error && <p className="text-red-500 text-sm animate-pulse">{error}</p>}
    </div>
  );
});

export default TaskForm;
