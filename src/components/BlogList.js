// BlogList.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js';
import { Link } from 'react-router-dom';

const containerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  padding: '20px',
  backgroundColor: '#f5f5dc', // Beige
};

const cardStyle = {
  width: '300px',
  margin: '20px',
  padding: '15px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff', // Blanc
};

const titleStyle = {
  fontSize: '1.5em',
  fontWeight: 'bold',
  color: '#543c28', // Marron foncé
};

const contentStyle = {
  marginTop: '10px',
  color: '#000000', // Noir
};

const readMoreLinkStyle = {
  color: '#a0522d', 
  textDecoration: 'none',
  cursor: 'pointer',
};

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsCollection = collection(db, 'file');
      const blogsSnapshot = await getDocs(blogsCollection);
      const blogsData = blogsSnapshot.docs.map(doc => doc.data());
      setBlogs(blogsData);
    };

    fetchBlogs();
  }, []);

  return (
    <div style={containerStyle} className="blog-list-container">
      {blogs.map(blog => (
        <div key={blog.name} style={cardStyle} className="blog-item">
          <h3 style={titleStyle}>{blog.name}</h3>
          <p style={contentStyle}>{blog.content.split('.')[0]}.</p>
          <Link to={`/blog/${blog.name}`} style={readMoreLinkStyle}>Read More</Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;