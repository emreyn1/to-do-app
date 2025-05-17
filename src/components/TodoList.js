import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ tasks, toggleTask, deleteTask, filter, setFilter, isDarkTheme }) {
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <>
      <div className="filter-buttons">
        <button
          className={`${filter === 'all' ? 'active' : ''} ${isDarkTheme ? 'dark' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`${filter === 'active' ? 'active' : ''} ${isDarkTheme ? 'dark' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          className={`${filter === 'completed' ? 'active' : ''} ${isDarkTheme ? 'dark' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      <ul className="task-list">
        {filteredTasks.map(task => (
          <TodoItem
            key={task.id}
            task={task}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            isDarkTheme={isDarkTheme}
          />
        ))}
      </ul>
    </>
  );
}

export default TodoList; 