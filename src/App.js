import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail'; // Importez BlogDetail
import AddDocument from './components/AddDocument';
import NavigationBar from './components/NavigationBar';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
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
          <Route path="/login" element={<SignIn/>} />
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
