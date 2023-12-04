import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  const containerStyle = {
    background: '#deb887',
    padding: '10px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#333', // Dark gray
    fontSize: '1.2em',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyle}>
      <Link to="/" style={linkStyle}>
        Accueil
      </Link>
      <Link to="/add" style={linkStyle}>
        Ajouter un blog
      </Link>
    </div>
  );
};

export default NavigationBar;
