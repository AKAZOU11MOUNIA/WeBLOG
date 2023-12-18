// BlogList.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js';
import { Link } from 'react-router-dom';
import {  query, where} from 'firebase/firestore';






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
  boxShadow: '3px 4px 8px rgba(255, 204, 188, 0.7)',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Blanc
};

const titleStyle = {
  fontSize: '25px',
  fontWeight: 'bold',
  color: '#80CBC4', 
};

const contentStyle = {
  marginTop: '10px',
  color: 'white', 
  fontSize:'15px'
};

const readMoreLinkStyle = {
  color: '#FFB74D', 
  textDecoration: 'none',
  cursor: 'pointer',
  positio:'absolute',
};
const searchStyle={
  width:'400px',
  height:'30px',
  borderRadius: '10px',
  boxShadow: '3px 4px 8px rgba(255, 255, 255, 1)',
  backgroundColor:'rgba(0,0,0,0)',
  margin:'0px 20px',
  padding:'10px',
  fontSize:'1.2em'
};
const searchButton={
  width:'24px',
  height:'24px',
  borderRadius:'50%',
  backgroundColor:'rgba(0,0,0,0)',
  position:'relative',
  alignItems: 'center',
  justifyContent:'center',
  margin:'3.5px -55px',
  padding:'2px'
  
}



const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsCollection = collection(db, 'file');
      const blogsSnapshot = await getDocs(blogsCollection);
      const blogsData = blogsSnapshot.docs.map(doc => doc.data());
      setBlogs(blogsData);
    };

    fetchBlogs();
  }, []);

   const handleSearch = async () => {
    try {
      const blogsCollection = collection(db, 'file');
      const searchWords = searchTerm.toLowerCase().split(/\s+/); // Split search phrase into words

      // Create an array of queries for each search word
      const searchQueries = searchWords.map(word =>
        query(blogsCollection, where('index', 'array-contains', word))
      );

      // Execute all queries in parallel
      const querySnapshots = await Promise.all(searchQueries.map(getDocs));

      // Merge the results from all queries
      const results = querySnapshots.reduce((mergedResults, snapshot) => {
        snapshot.forEach(doc => {
          const existingResult = mergedResults.find(result => result.id === doc.id);
          if (!existingResult) {
            mergedResults.push({ id: doc.id, ...doc.data() });
          }
        });
        return mergedResults;
      }, []);

      setBlogs(results);
    } catch (error) {
      console.error('Error searching blogs:', error);
    }
  };

  return (
    <div>
      
      <input
        type="text"
        placeholder="Search by index"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={searchStyle}
      />
      <button onClick={handleSearch} style={searchButton}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
        </button>
      

    <div style={containerStyle} className="blog-list-container">
      {blogs.map(blog => (
        <div key={blog.name} style={cardStyle} className="blog-item">
          <h3 style={titleStyle}>{blog.name}</h3>
          <p style={contentStyle}>{blog.content.split('.')[0]}.</p>
          <Link to={`/blog/${blog.name}`} style={readMoreLinkStyle}>Read More</Link>
        </div>
      ))}
    </div>
    </div>
  );
};


export default BlogList;
