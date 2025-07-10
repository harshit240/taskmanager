import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [filter, setFilter] = useState('all');
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  const addTask = useCallback((text) => {
    const newTask = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
  }, [setTasks]);

  const toggleTask = useCallback((id) => {
    setTasks(prev => prev.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  }, [setTasks]);

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, [setTasks]);

  const onDragEnd = useCallback((result) => {
    const { source, destination } = result;
    if (!destination || source.index === destination.index) return;

    setTasks(prev => {
      const reordered = [...prev];
      const [removed] = reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, removed);
      return reordered;
    });
  }, [setTasks]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, [setTheme]);

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'completed': return tasks.filter(task => task.completed);
      case 'pending': return tasks.filter(task => !task.completed);
      default: return tasks;
    }
  }, [tasks, filter]);

  const taskStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  }, [tasks]);

  const value = {
    tasks: filteredTasks,
    allTasks: tasks,
    filter,
    setFilter,
    theme,
    toggleTheme,
    addTask,
    toggleTask,
    deleteTask,
    onDragEnd,
    taskStats,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};
