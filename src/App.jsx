// src/App.jsx
import { useState } from 'react';
import Blog from './components/Blog';
import AddPost from './components/AddPost';
import './App.css';  // Import the CSS file

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="app-container">
      <h1 className="app-title">InfoPrint Services Blog</h1>
      <div className="blog-description">
        <p>Welcome to the InfoPrint Services Blog! This space is dedicated to sharing the latest news, updates, and insights about our printing services. Stay tuned for helpful tips, industry trends, and stories from our team and customers.</p>
      </div>
      <Blog />
      <button className="add-post-button" onClick={() => setModalIsOpen(true)}>Ajouter un Post</button>
      <AddPost isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} />
    </div>
  );
};

export default App;
