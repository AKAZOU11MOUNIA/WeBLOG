
// Home.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogList from './BlogList';
import AddDocument from  './AddDocument';
import NavigationBar from './NavigationBar';

const Home = () => {
  
  return (

      <div>
        <NavigationBar />
        <BlogList/>
      </div>
   
  );
};

export default Home;
