import React, { useState } from 'react';

function TodoList({ tasks = [], onDelete, onUpdate }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEditStart = (index, currentText) => {
    setEditingIndex(index);
    setEditText(currentText);
  };

  const handleEditSave = (index) => {
    if (editText.trim()) {
      onUpdate(index, editText.trim());
    }
    setEditingIndex(null);
  };

  const tasksList = tasks.map((task, index) => {
    const isEditing = editingIndex === index;

    return (
      <li key={index} className="task-item">
        <div className="task-content">
          <input
            type="checkbox"
            className="task-checkbox"
            checked={task.completed || false}
            onChange={() => {
              const updatedText = task.text || task;
              // Передаємо оновлений статус через виклик пропса редагування
              onUpdate(index, updatedText, !task.completed);
            }}
          />

          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #6366f1', outline: 'none', flex: 1 }}
            />
          ) : (
            <span className={`task-text ${task.completed ? 'completed' : ''}`}>
              {task.text || task}
            </span>
          )}
        </div>

        <div className="btn-group">
          {isEditing ? (
            <button className="btn-edit" onClick={() => handleEditSave(index)}>
              Зберегти
            </button>
          ) : (
            <button className="btn-edit" onClick={() => handleEditStart(index, task.text || task)}>
              Редагувати
            </button>
          )}
          <button className="btn-delete" onClick={() => onDelete(index)}>
            Видалити
          </button>
        </div>
      </li>
    );
  });

  return (
    <div>
      <ul className="task-list">
        {tasksList.length > 0 ? tasksList.length && tasksList : <p style={{ textAlign: 'center', color: '#94a3b8', padding: '20px' }}>Список завдань порожній</p>}
      </ul>
    </div>
  );
}

export default TodoList;