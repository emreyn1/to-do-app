import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    if (savedTheme) {
      setIsDarkTheme(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('darkTheme', JSON.stringify(isDarkTheme));
  }, [tasks, isDarkTheme]);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    
    const task = {
      id: Date.now(),
      name: newTask,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearAllTasks = () => {
    setTasks([]);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className={`app ${isDarkTheme ? 'dark' : ''}`}>
      <div className="todo-container">
        <div className="header">
          <h1>Task Manager</h1>
          <button 
            onClick={toggleTheme} 
            className={`theme-toggle ${isDarkTheme ? 'dark' : ''}`}
          >
            {isDarkTheme ? '☀️' : '🌙'}
          </button>
        </div>
        
        <TodoForm 
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
          isDarkTheme={isDarkTheme}
        />

        <TodoList 
          tasks={tasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          filter={filter}
          setFilter={setFilter}
          isDarkTheme={isDarkTheme}
        />

        <div className="task-stats">
          <p>{tasks.filter(task => !task.completed).length} tasks remaining</p>
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