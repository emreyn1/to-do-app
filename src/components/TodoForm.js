import React from 'react';

function TodoForm({ newTask, setNewTask, addTask, isDarkTheme }) {
  return (
    <form onSubmit={addTask} className="task-form">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task..."
        className={`task-input ${isDarkTheme ? 'dark' : ''}`}
      />
      <button type="submit" className={`add-button ${isDarkTheme ? 'dark' : ''}`}>
        Add Task
      </button>
    </form>
  );
}

export default TodoForm; 