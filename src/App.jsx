// src/App.jsx
import { useState } from 'react';
import Blog from './components/Blog';
import AddPost from './components/AddPost';
import './App.css';

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="app-container">
      <h1 className="app-title">InfoPrint Services Blog</h1>
      <Blog />
      <button className="add-post-button" onClick={() => setModalIsOpen(true)}>Ajouter un Post</button>
      <AddPost isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} />
    </div>
  );
};

export default App;
