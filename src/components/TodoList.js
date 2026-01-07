import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TodoItem from './TodoItem';

function TodoList({ tasks, toggleTask, deleteTask, editTask, filter, setFilter, isDarkTheme }) {
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
        <AnimatePresence mode="popLayout">
          {tasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`empty-state ${isDarkTheme ? 'dark' : ''}`}
            >
              <p>📝 No tasks yet. Add one above!</p>
            </motion.div>
          ) : (
            tasks.map(task => (
              <TodoItem
                key={task.id}
                task={task}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
                editTask={editTask}
                isDarkTheme={isDarkTheme}
              />
            ))
          )}
        </AnimatePresence>
      </ul>
    </>
  );
}

export default TodoList; 