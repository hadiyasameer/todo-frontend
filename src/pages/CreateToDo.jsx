import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios/axiosinstance'

function CreateTodo() {
  const navigate = useNavigate();
  const [todo, setTodo] = useState({ title: '', description: '', status: '', duedate: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    axiosInstance.post('/todo/todos', todo)
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
          <input type="text" name="title" value={todo.title} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
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
        <div style={{ marginBottom: '10px' }}>
          <label>Status:</label>
          <input type="text" name="status" value={todo.status} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Due Date:</label>
          <input type="date" name="duedate" value={todo.duedate} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </div>        <button type="submit" style={{ padding: '10px 20px' }}>Create</button>
      </form>
    </div>
  );
}

export default CreateTodo;
