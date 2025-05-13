import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import { FaTrash } from 'react-icons/fa';

function DeleteToDo() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}`)
            .then(res => setTodos(res.data))
            .catch(err => console.error("Error fetching todos:", err));
    }, []);


    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            axios.delete(`${import.meta.env.VITE_REACT_APP_BASE_URL}/${id}`)
                .then(() => {
                    setTodos(prev => prev.filter(todo => todo._id !== id));
                    alert('To-Do deleted successfully!');
                })
                .catch(err => console.error("Delete failed:", err));
        }
    };

    return (
        <div>
            {
                todos.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>No to-dos available.</p>
                ) : (
                    todos.map((todo, index) => (
                        <div key={todo._id} style={{ marginBottom: '20px', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>

                            <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
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
                                        <th style={{ backgroundColor: '#f2f2f2' }}>Status</th>
                                        <td>{todo.status}</td>
                                    </tr>
                                    <tr>
                                        <th style={{ backgroundColor: '#f2f2f2' }}>Due Date</th>
                                        <td>{todo.duedate}</td>
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
                        </div>
                    ))
                )
            }

        </div>
    );
}

export default DeleteToDo;
