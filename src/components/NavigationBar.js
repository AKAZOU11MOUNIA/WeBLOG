import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import logoV2 from './logoV2.png';

const NavigationBar = () => {
  const containerStyle = {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor:'rgba(245, 245, 245,0)',
    padding:'60px'
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#333', 
    fontSize: '12px',
    fontWeight: 'bold',
  };
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const buttonStyle={
    borderRadius: '39px',
    border:'3px solid #1B5E20',
    borderColor:'#1B5E20',
    height: '55px',
    width: '210px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    textDecoration: 'none',
    fontSize: '1.5em',
    fontWeight: 'bold',
    color:'#E0F7FA',
    //Animation des buttons:
    
    boxShadow: isHovered || isFocused ? '0.5em 0.5em 0.5em -0.4em rgba(255, 238, 88, 1)' : 'none',
    transform: isHovered || isFocused ? 'translateY(-0.55em)' : 'none',
    cursor: 'pointer',
    //position dans le navBar:
    marginTop:'-33px',
    marginLeft:'-10px'
  };
  const logoStyle={
    height:'130px',
    marginTop:'-45px',
    marginLeft:'-139px',
    marginRight:'200px'
  };
  

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
      <Link to="/login" style={linkStyle}>
        <button style={buttonStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        >Log In Pour Ajouter Blog</button>
      </Link>
    </div>
  );
};

export default NavigationBar;
