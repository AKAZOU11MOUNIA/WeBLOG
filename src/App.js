import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail'; // Importez BlogDetail
import AddDocument from './components/AddDocument';
import NavigationBar from './components/NavigationBar';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <NavigationBar />
        <Routes>
          <Route exact path="/" element={<BlogList />} />
          <Route path="/blog/:blogName" element={<BlogDetail />} />
          <Route path="/add" element={<AddDocument />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
