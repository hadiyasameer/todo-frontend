import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance  from '../axios/axiosinstance';
import Spinner from '../components/Spinner';

function EditTodo() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [todo, setTodo] = useState({ title: '', description: '', status: '', duedate: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get(`/todo/${id}`)
            .then(res => {
                const formattedTodo = {
                    ...res.data,
                    duedate: new Date(res.data.duedate).toISOString().split('T')[0]
                };
                setTodo(formattedTodo);
                setLoading(false);

            })
            .catch(err => {
                console.error("Error fetching todo:", err)
                setLoading(false);
            })

    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTodo(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance.put(`/todo/${id}`, todo)
            .then(() => {
                alert('To-Do updated successfully!');
                navigate('/');
            })
            .catch(err => console.error("Error updating todo:", err));
    };
    if (loading) {
        return <Spinner />;
    }

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2>Edit To-Do</h2>
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
                    <select
                        name="status"
                        value={todo.status}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    >
                        <option value="">--Select--</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Due Date:</label>
                    <input
                        type="date"
                        name="duedate"
                        value={todo.duedate}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px 20px' }}>Update</button>
            </form>
        </div>
    );
}

export default EditTodo;
