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
  backgroundColor: 'rgba(224, 224, 224, 0)', 
};

const cardStyle = {
  width: '300px',
  margin: '20px',
  padding: '15px',
  borderRadius: '10px',
  boxShadow: '3px 4px 8px rgba(255, 255, 255, 0.7)',
  backgroundColor: 'rgba(0, 0, 0, 0.3)', // Blanc
};

const titleStyle = {
  fontSize: '25px',
  fontWeight: 'bold',
  color: '#BBDEFB', // Marron foncé
};

const contentStyle = {
  marginTop: '10px',
  color: 'white', 
  fontSize:'15px'
};

const readMoreLinkStyle = {
  color: '#18FFFF', 
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
