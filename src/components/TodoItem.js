import React, { useState } from 'react';
import { motion } from 'framer-motion';

function TodoItem({ task, toggleTask, deleteTask, editTask, isDarkTheme }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(task.name);
  const [editPriority, setEditPriority] = useState(task.priority || 'medium');

  const handleSave = () => {
    if (editName.trim() !== '') {
      editTask(task.id, editName.trim(), editPriority);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditName(task.name);
    setEditPriority(task.priority || 'medium');
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#e74c3c';
      case 'medium': return '#f39c12';
      case 'low': return '#27ae60';
      default: return '#95a5a6';
    }
  };

  const getPriorityLabel = (priority) => {
    switch(priority) {
      case 'high': return '🔴 High';
      case 'medium': return '🟡 Medium';
      case 'low': return '🟢 Low';
      default: return 'Medium';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      layout
      className={`task-item ${task.completed ? 'completed' : ''} ${isDarkTheme ? 'dark' : ''} priority-${task.priority || 'medium'}`}
    >
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className={`task-checkbox ${isDarkTheme ? 'dark' : ''}`}
        />
        {isEditing ? (
          <div className="edit-container">
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={handleSave}
              autoFocus
              className={`edit-input ${isDarkTheme ? 'dark' : ''}`}
            />
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
              className={`edit-priority-select ${isDarkTheme ? 'dark' : ''}`}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <div className="edit-buttons">
              <button onClick={handleSave} className="save-button">✓</button>
              <button onClick={handleCancel} className="cancel-button">✕</button>
            </div>
          </div>
        ) : (
          <>
            <div className="task-info">
              <span className="task-name">{task.name}</span>
              <div className="task-meta">
                <span 
                  className="priority-badge"
                  style={{ backgroundColor: getPriorityColor(task.priority || 'medium') + '20', color: getPriorityColor(task.priority || 'medium') }}
                >
                  {getPriorityLabel(task.priority || 'medium')}
                </span>
                <span className="task-date">{formatDate(task.createdAt)}</span>
              </div>
            </div>
          </>
        )}
      </div>
      {!isEditing && (
        <div className="task-actions">
          <button
            onClick={() => setIsEditing(true)}
            className={`edit-button ${isDarkTheme ? 'dark' : ''}`}
            title="Edit task"
          >
            ✏️
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className={`delete-button ${isDarkTheme ? 'dark' : ''}`}
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      )}
    </motion.li>
  );
}

export default TodoItem; 