import { Link } from 'react-router-dom'
import { FaEdit, FaTrash, FaInfoCircle, FaPlus } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/todo')
            .then(res => setTodos(res.data))
            .catch(err => console.error("Error fetching todos:", err));
    }, []);



    return (
        <div style={{ padding: '20px' }}>
            <h2>To-Do List</h2>
            <Link to="/create" title="Add To-Do">
                <button style={{ padding: '10px', fontSize: '18px' }}>
                    <FaPlus />
                </button>
            </Link>

            <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th>No:</th>
                        <th>Title</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo, index) => (
                        <tr key={todo._id}>
                            <td>{index + 1}</td>
                            <td>{todo.title}</td>
                            <td style={{ textAlign: 'center' }}>

                                <Link to={`/view/${todo._id}`} title="View Info">
                                    <FaInfoCircle color="green" />
                                </Link>
                                <Link to={`/edit/${todo._id}`} title="Edit" style={{ marginRight: '10px' }}>
                                    <FaEdit color="blue" />
                                </Link>
                                <Link to={`/delete/${todo._id}`} title="Delete" style={{ marginRight: '10px' }}>
                                    <FaTrash color="red" />
                                </Link>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
    )
}

export default Home