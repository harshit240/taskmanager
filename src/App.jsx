import React from 'react';
import { useTask } from './context/TaskContext';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import FilterButtons from './components/FilterButtons';
import TaskList from './components/TaskList';

const App = () => {
  const { theme } = useTask();

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50'} min-h-screen transition-colors duration-300`}>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <TaskForm />
          <FilterButtons />
          <TaskList />
        </div>
      </main>
    </div>
  );
};

export default App;