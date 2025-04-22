import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import { FaTrash } from 'react-icons/fa';

function DeleteToDo() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/todo') 
            .then(res => setTodos(res.data))
            .catch(err => console.error("Error fetching todos:", err));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            axios.delete(`http://localhost:3000/todo/${id}`)
                .then(() => {
                    setTodos(prev => prev.filter(todo => todo.id !== id));
                    alert('To-Do deleted successfully!');
                })
                .catch(err => console.error("Delete failed:", err));
        }
    };

    return (
        <div>
            {todos.map((todo, index) => (
                <table key={todo._id} border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                        <tr>
                            <th style={{ width: '20%', backgroundColor: '#f2f2f2' }}>No:</th>
                            <td>{index + 1}</td>
                        </tr>
                        <tr>
                            <th style={{ backgroundColor: '#f2f2f2' }}>Title</th>
                            <td>{todo.title}</td>
                        </tr>
                        <tr>
                            <th style={{ backgroundColor: '#f2f2f2' }}>Description</th>
                            <td>{todo.description}</td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ textAlign: 'center' }}>
                                <button
                                    onClick={() => handleDelete(todo._id)}
                                    title="Delete"
                                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                    <FaTrash color="red" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            ))}
        </div>
    );
}

export default DeleteToDo;
