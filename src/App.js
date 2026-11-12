import './App.css';
import TodoList from './components/todoList';
import UpdateList from './components/updateList';
import { useState } from 'react';

function App() {
  // Зберігаємо завдання як об'єкти з текстом та статусом виконання
  const [tasks, updateTasks] = useState([
    { text: 'Вивчити компоненти React', completed: true },
    { text: 'Розібратися з useState та props', completed: false },
    { text: 'Підготувати деплой на Render', completed: false }
  ]);

  const addTask = (newTaskText) => {
    updateTasks((prev) => [...prev, { text: newTaskText, completed: false }]);
  };

  const removeTask = (indexToRemove) => {
    updateTasks((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const updateTask = (indexToUpdate, newText, newCompletedStatus) => {
    updateTasks((prev) =>
      prev.map((task, i) => {
        if (i === indexToUpdate) {
          return {
            text: newText,
            completed: newCompletedStatus !== undefined ? newCompletedStatus : task.completed
          };
        }
        return task;
      })
    );
  };

  return (
    <div className="container">
      <h2>PulseFit Task Manager</h2>
      <UpdateList onAddTask={addTask} />
      <TodoList tasks={tasks} onDelete={removeTask} onUpdate={updateTask} />
    </div>
  );
}

export default App;