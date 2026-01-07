import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      // Migrate old tasks to include priority if missing
      const migratedTasks = parsedTasks.map(task => ({
        ...task,
        priority: task.priority || 'medium',
        updatedAt: task.updatedAt || task.createdAt
      }));
      setTasks(migratedTasks);
    }
    if (savedTheme) {
      const darkMode = JSON.parse(savedTheme);
      setIsDarkTheme(darkMode);
      // Set body class on initial load
      if (darkMode) {
        document.body.classList.add('dark');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('darkTheme', JSON.stringify(isDarkTheme));
    
    // Update body class for dark mode
    if (isDarkTheme) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [tasks, isDarkTheme]);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    
    const task = {
      id: Date.now(),
      name: newTask.trim(),
      completed: false,
      priority: newTaskPriority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setTasks([...tasks, task]);
    setNewTask('');
    setNewTaskPriority('medium');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, newName, newPriority) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, name: newName, priority: newPriority, updatedAt: new Date().toISOString() } : task
    ));
  };

  const clearAllTasks = () => {
    if (window.confirm('Are you sure you want to delete all tasks?')) {
      setTasks([]);
    }
  };

  const clearCompletedTasks = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  // Filter and search tasks
  let filteredTasks = tasks.filter(task => {
    // Filter by status
    if (filter === 'active') {
      if (task.completed) return false;
    } else if (filter === 'completed') {
      if (!task.completed) return false;
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      return task.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    return true;
  });

  // Sort tasks
  filteredTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === 'oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    } else if (sortBy === 'alphabetical') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className={`app ${isDarkTheme ? 'dark' : ''}`}>
      <div className="todo-container">
        <div className="header">
          <h1>✨ Task Manager</h1>
          <button 
            onClick={toggleTheme} 
            className={`theme-toggle ${isDarkTheme ? 'dark' : ''}`}
            aria-label="Toggle theme"
          >
            {isDarkTheme ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Statistics */}
        {totalTasks > 0 && (
          <div className={`stats-container ${isDarkTheme ? 'dark' : ''}`}>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">Total</span>
                <span className="stat-value">{totalTasks}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Active</span>
                <span className="stat-value">{activeTasks}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Completed</span>
                <span className="stat-value">{completedTasks}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Progress</span>
                <span className="stat-value">{completionPercentage}%</span>
              </div>
            </div>
            <div className="progress-bar-container">
              <div 
                className={`progress-bar ${isDarkTheme ? 'dark' : ''}`}
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <TodoForm 
          newTask={newTask}
          setNewTask={setNewTask}
          newTaskPriority={newTaskPriority}
          setNewTaskPriority={setNewTaskPriority}
          addTask={addTask}
          isDarkTheme={isDarkTheme}
        />

        {/* Search and Sort */}
        <div className="controls-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="🔍 Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`search-input ${isDarkTheme ? 'dark' : ''}`}
            />
          </div>
          <div className="sort-container">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`sort-select ${isDarkTheme ? 'dark' : ''}`}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="priority">Priority</option>
              <option value="alphabetical">A-Z</option>
            </select>
          </div>
        </div>

        <TodoList 
          tasks={filteredTasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          editTask={editTask}
          filter={filter}
          setFilter={setFilter}
          isDarkTheme={isDarkTheme}
        />

        <div className="task-stats">
          <div className="stats-info">
            <p>{activeTasks} {activeTasks === 1 ? 'task' : 'tasks'} remaining</p>
            {completedTasks > 0 && (
              <button 
                onClick={clearCompletedTasks}
                className={`clear-completed-button ${isDarkTheme ? 'dark' : ''}`}
              >
                Clear Completed
              </button>
            )}
          </div>
          {tasks.length > 0 && (
            <button 
              onClick={clearAllTasks}
              className={`clear-all-button ${isDarkTheme ? 'dark' : ''}`}
            >
              Clear All
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;