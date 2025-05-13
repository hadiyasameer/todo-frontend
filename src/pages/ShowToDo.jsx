import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import  axiosInstance  from '../axios/axiosinstance';
import Spinner from '../components/Spinner';

function ShowToDo() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [todo, setTodo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axiosInstance.get(`/todo/${id}`)
            .then(res => {
                setTodo(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching todo:", err);
                setLoading(false);
            });
    }, [id]);

    const handleDelete = () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this To-Do?');
        if (confirmDelete) {
            axiosInstance.delete(`/todo/${id}`)
                .then(() => {
                    alert('To-Do deleted successfully!');
                    navigate('/');
                })
                .catch(err => console.error("Error deleting todo:", err));
        }
    };

    if (loading) return <Spinner />;

    if (!todo) return <p style={{ textAlign: 'center' }}>To-Do not found.</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>To-Do Details</h2>
            <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
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
                        <td>{new Date(todo.duedate).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                        <th style={{ backgroundColor: '#f2f2f2' }}>Actions</th>
                        <td>
                            <span style={{ display: 'flex', gap: '10px' }}>
                                <Link to={`/edit/${todo._id}`} title="Edit">
                                    <FaEdit color="blue" />
                                </Link>
                                <button
                                    onClick={handleDelete}
                                    title="Delete"
                                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                    <FaTrash color="red" />
                                </button>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ShowToDo;
