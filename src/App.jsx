import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import ShowToDo from './pages/ShowToDo'
import EditToDo from './pages/EditToDo'
import DeleteToDo from './pages/DeleteToDo'
import CreateTodo from './pages/CreateToDo';
import { Route } from 'react-router-dom'

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/show/:id" element={<ShowToDo/>}></Route>
        <Route path="/edit/:id" element={<EditToDo/>}></Route>
        <Route path="/delete/:id" element={<DeleteToDo/>}></Route>
        <Route path="/create" element={<CreateTodo />} />
        
      </Routes>
      </BrowserRouter>
  )
}

export default App