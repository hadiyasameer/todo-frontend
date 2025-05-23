import { Link } from 'react-router-dom'
import { FaEdit, FaTrash, FaInfoCircle, FaPlus } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios/axiosinstance';
import Header from '../components/Header';

function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
            axiosInstance.get('/todo/todos', { withCredentials: true })
                .then(res => {
                    setTodos(res.data);
                    setIsLoggedIn(true);
                }).catch(err => {
                    console.error("Error fetching todos:", err);
                    setIsLoggedIn(false);
                });
        
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this to-do?')) {
            axiosInstance.delete(`/todo/${id}`,{ withCredentials: true })
                .then(() => {
                    setTodos(todos.filter(todo => todo._id !== id));
                    alert('To-Do deleted successfully!');
                })
                .catch(err => console.error("Error deleting todo:", err));
        }
    };


    return (
        <>
            <Header />
            <div style={{ padding: '20px' }}>
                <h2>To-Do List</h2>

                <Link to="/create" title="Add To-Do">
                    <button style={{ padding: '10px', fontSize: '18px' }}>
                        <FaPlus />
                    </button>
                </Link>
                {isLoggedIn ? (
                    <>
                        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f2f2f2' }}>
                                    <th style={{ textAlign: 'center' }}>No:</th>
                                    <th style={{ textAlign: 'center' }}>Title</th>
                                    <th style={{ textAlign: 'center' }}>Operations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todos.map((todo, index) => (
                                    <tr key={todo._id}>
                                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                        <td style={{ textAlign: 'center' }}>{todo.title}</td>
                                        <td style={{ textAlign: 'center' }}>

                                            <Link to={`/show/${todo._id}`} title="View Info">
                                                <FaInfoCircle color="green" />
                                            </Link>
                                            <Link to={`/edit/${todo._id}`} title="Edit" style={{ marginRight: '10px' }}>
                                                <FaEdit color="blue" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(todo._id)}
                                                title="Delete"
                                                style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                                <FaTrash color="red" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </>) : (
                    <p>Please log in to view your to-do list.</p>
                )
                }
            </div>
        </>
    )
}

export default Home