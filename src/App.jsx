import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';  // Add this import
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store, persister } from './redux/store';  // Ensure persister is imported

import Home from './pages/Home';
import ShowToDo from './pages/ShowToDo';
import EditToDo from './pages/EditToDo';
import DeleteToDo from './pages/DeleteToDo';
import CreateTodo from './pages/CreateToDo';
import Login from './pages/login';
import Signup from './pages/Signup';

function App() {
  return (
    <Provider store={store}>
      {/* Wrap the app with PersistGate and provide persister */}
      <PersistGate loading={<div>Loading...</div>} persistor={persister}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/show/:id" element={<ShowToDo />} />
            <Route path="/edit/:id" element={<EditToDo />} />
            <Route path="/delete/:id" element={<DeleteToDo />} />
            <Route path="/create" element={<CreateTodo />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
