import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useTask } from '../context/TaskContext';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { tasks, onDragEnd, theme } = useTask();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="task-list">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`space-y-3 transition-all duration-200 p-2 rounded-lg ${
              snapshot.isDraggingOver
                ? theme === 'dark'
                  ? 'bg-gray-700'
                  : 'bg-blue-50'
                : ''
            }`}
          >
            {tasks.length === 0 ? (
              <div className="text-center py-12 text-gray-400 dark:text-gray-500">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-lg">No tasks yet</p>
                <p className="text-sm">Add your first task to get started!</p>
              </div>
            ) : (
              tasks.map((task, index) => (
                <TaskItem key={task.id} task={task} index={index} />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
