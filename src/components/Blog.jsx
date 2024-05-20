// src/components/Blog.js
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = await getDocs(collection(db, 'posts'));
      setPosts(postsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchPosts();
  }, []);

  return (
    <div className="blog-container">
      <h1 className="blog-title">Blog Posts</h1>
      {posts.map(post => (
        <div key={post.id} className="blog-post">
          <h2 className="post-title">{post.nom} {post.prenom}</h2>
          <p className="post-description">{post.description}</p>
          {post.photoUrl && <img src={post.photoUrl} alt={`${post.nom} ${post.prenom}`} className="post-image" />}
        </div>
      ))}
    </div>
  );
};

export default Blog;
