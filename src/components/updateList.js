import React, { useState } from 'react';

function UpdateList({ onAddTask }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onAddTask(value.trim());
    }
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Введіть нове завдання..."
      />
      <button type="submit">Додати</button>
    </form>
  );
}

export default UpdateList;