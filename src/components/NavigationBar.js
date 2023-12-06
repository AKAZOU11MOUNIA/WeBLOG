import React from 'react';
import { Link } from 'react-router-dom';
import logoV2 from './logoV2.png';
import { useState } from 'react';

const NavigationBar = () => {
  const containerStyle = {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor:'rgba(245, 245, 245,0)'
  };
  const linkStyle = {
    textDecoration: 'none',
    color: '#333', // Dark gray
    fontSize: '12px',
    fontWeight: 'bold',
  };
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const buttonStyle={
    borderRadius: '39px',
    border:'3px solid #1A237E',
    borderColor:'#1A237E',
    height: '50px',
    width: '200px',
    backgroundColor: 'rgba(225, 245, 254,0)',
    textDecoration: 'none',
    fontSize: '1.2em',
    fontWeight: 'bold',
    color:'#B3E5FC',
    //Animation des buttons:
    
    boxShadow: isHovered || isFocused ? '0.5em 0.5em 0.5em -0.4em rgba(225, 245, 254, 1)' : 'none',
    transform: isHovered || isFocused ? 'translateY(-0.55em)' : 'none',
    cursor: 'pointer',
    //position dans le navBar:
    marginTop:'80px',
    
    
  };
  const logoStyle={
    height:'130px',
    marginTop:'25px',
    marginLeft:'-100px'
  }

  return (
    <div style={containerStyle}>
      <img src={logoV2} style={logoStyle} alt="img"/>
      <Link to="/" style={linkStyle}>
        <button style={buttonStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        >Accueil</button>
      </Link>
      <Link to="/add" style={linkStyle}>
        <button style={buttonStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        >Ajouter un blog</button>
      </Link>
    </div>
  );
};

export default NavigationBar;
