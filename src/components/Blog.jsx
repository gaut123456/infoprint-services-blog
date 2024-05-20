// src/components/Blog.js
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = await getDocs(collection(db, 'posts'));
      setPosts(postsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <div className="blog-container">
      <h1 className="blog-title">Blog Posts</h1>
      {loading ? (
        [1, 2, 3].map((n) => (
          <div key={n} className="blog-post">
            <h2 className="post-title"><Skeleton width={200} /></h2>
            <p className="post-description"><Skeleton count={3} /></p>
            <div className="image-container">
              <Skeleton height={200} />
            </div>
          </div>
        ))
      ) : (
        posts.map(post => (
          <div key={post.id} className="blog-post">
            <h2 className="post-title">{post.nom} {post.prenom}</h2>
            <p className="post-description">{post.description}</p>
            {post.photoUrl && (
              <div className="image-container">
                <img src={post.photoUrl} alt={`${post.nom} ${post.prenom}`} className="post-image" />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Blog;
