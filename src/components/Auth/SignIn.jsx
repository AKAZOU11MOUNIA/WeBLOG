import React,{useState} from 'react';
import {auth} from "../../firebase";
import{signInWithEmailAndPassword} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
const styles = {
    container: {
      padding: '20px',
      backgroundColor: 'rgba(255, 248, 225,0.3)', // Beige
      borderRadius: '10px',
      boxShadow: '3px 4px 8px rgba(255, 255, 255, 1)',
      width: '400px',
      margin: 'auto',
      marginTop:'-50px',
      height:'400px',
      
    },
    input1: {
      marginTop:'25px',
      padding: '8px',
      fontSize: '16px',
      width: '100%',
      boxSizing: 'border-box',
      backgroundColor: 'rgba(255, 248, 225,0.3)', 
      borderRadius: '30px',
      border:'3px solid #1B5E20',
      borderColor:'#1B5E20'
    },
    input2: {
        marginTop:'25px',
        padding: '8px',
        fontSize: '16px',
        width: '100%',
        boxSizing: 'border-box',
        backgroundColor: 'rgba(255, 248, 225,0.3)', 
        borderRadius: '30px',
        border:'3px solid #1B5E20',
        borderColor:'#1B5E20'
    },
    button: {
      backgroundColor: '#faebd7', // Green
      color: '#1B5E20',
      padding: '10px',
      fontSize: '20px',
      cursor: 'pointer',
      width: '100%',
      marginTop:'50px',
      borderRadius: '30px',
      border:'3px solid #1B5E20',
      borderColor:'#1B5E20',
    },
    ancre:{
        textAlign:"center",display:"block",
        textDecoration:'none',
        marginTop:'55px',
        fontSize:'10px',
        color:'#1B5E20'
    },
    title:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'9vh',
        fontFamily:'Arial',
        color:'#004D40'
    }
};
const SignIn = ()=>{
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const navigate = useNavigate();
    const signIn =(e)=>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password).
        then((userCredential)=>{
            console.log(userCredential);
            navigate('/add');
        }).catch((error)=>{
            console.log(error);
            alert("Connection failed")
        })
    }
    return(
        <div className="container" style={styles.container}>
            <form onSubmit={signIn}>
                <h1 style={styles.title}>Log In To Your Account</h1>
                <input 
                type='email' 
                placeholder='Email' 
                value={email}
                onChange={(e) =>setEmail(e.target.value)}
                style={styles.input1}></input>
                <input 
                type='password' 
                placeholder='Password' 
                value={password}
                onChange={(e) =>setPassword(e.target.value)}
                style={styles.input2}>
                </input>
                <button type="submit" style={styles.button}>Log in</button>
                <i><b><a href='/signup' style={styles.ancre}>Don't have an account yet 🤔? Create an account now 😉!</a></b></i>
                
            </form>
        </div>
    );
}
export default SignIn;