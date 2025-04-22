import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosConfig';

function CreateTodo() {
  const navigate = useNavigate();
  const [todo, setTodo] = useState({ title: '', description: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted"); // Check this in the browser console
    axios.post('https://todo-backend-rbvn.onrender.com/todo', todo)
    .then(() => {
        alert('To-Do created successfully!');
        navigate('/');
      })
      .catch(err => console.error("Error creating todo:", err));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Create New To-Do</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={todo.title}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Description:</label>
          <textarea
            name="description"
            value={todo.description}
            onChange={handleChange}
            required
            rows={4}
            style={{ width: '100%', padding: '8px' }}
          ></textarea>
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>Create</button>
      </form>
    </div>
  );
}

export default CreateTodo;
