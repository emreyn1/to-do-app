import React from 'react';

function TodoItem({ task, toggleTask, deleteTask, isDarkTheme }) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''} ${isDarkTheme ? 'dark' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className={`task-checkbox ${isDarkTheme ? 'dark' : ''}`}
        />
        <span className="task-name">{task.name}</span>
      </div>
      <button
        onClick={() => deleteTask(task.id)}
        className={`delete-button ${isDarkTheme ? 'dark' : ''}`}
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem; 