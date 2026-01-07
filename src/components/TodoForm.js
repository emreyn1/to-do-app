import React from 'react';

function TodoForm({ newTask, setNewTask, newTaskPriority, setNewTaskPriority, addTask, isDarkTheme }) {
  return (
    <form onSubmit={addTask} className="task-form">
      <div className="form-inputs">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className={`task-input ${isDarkTheme ? 'dark' : ''}`}
        />
        <select
          value={newTaskPriority}
          onChange={(e) => setNewTaskPriority(e.target.value)}
          className={`priority-select ${isDarkTheme ? 'dark' : ''}`}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>
      <button type="submit" className={`add-button ${isDarkTheme ? 'dark' : ''}`}>
        ➕ Add Task
      </button>
    </form>
  );
}

export default TodoForm; 