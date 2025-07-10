import { Draggable } from 'react-beautiful-dnd';
import { Check, Trash2, GripVertical } from 'lucide-react';
import { useTask } from '../context/TaskContext';
import { useState, useCallback, memo } from 'react';

const TaskItem = memo(({ task, index }) => {
  const { toggleTask, deleteTask, theme } = useTask();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      toggleTask(task.id);
      setIsAnimating(false);
    }, 150);
  }, [toggleTask, task.id]);

  const handleDelete = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      deleteTask(task.id);
    }, 150);
  }, [deleteTask, task.id]);

  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`group flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 ${
            isAnimating ? 'scale-95 opacity-50' : 'hover:scale-[1.02]'
          } ${
            snapshot.isDragging ? 'shadow-2xl scale-105 bg-opacity-80' : ''
          } ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700 text-white'
              : 'bg-white border-gray-200 text-gray-900'
          } ${task.completed ? 'opacity-75 line-through' : ''}`}
        >
          <GripVertical size={16} className="text-gray-400" />
          <button
            onClick={handleToggle}
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              task.completed
                ? 'bg-green-500 border-green-500 text-white'
                : theme === 'dark'
                ? 'border-gray-600 hover:border-green-500'
                : 'border-gray-300 hover:border-green-500'
            }`}
          >
            {task.completed && <Check size={12} />}
          </button>
          <span className="flex-1">{task.text}</span>
          <button
            onClick={handleDelete}
            className={`p-2 rounded-lg transition duration-200 hover:scale-110 ${
              theme === 'dark'
                ? 'text-gray-400 hover:text-red-400 hover:bg-red-900/20'
                : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </Draggable>
  );
});

export default TaskItem;
