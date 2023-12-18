import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore'; // Import necessary Firestore functions
import {  db } from '../firebase.js';



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
    fontSize: '16px',
    width: '100%',
    height:'200px',
    boxSizing: 'border-box',
    backgroundColor: 'rgba(255, 248, 225,0.3)', 
    borderRadius: '30px',
    border:'3px solid #1B5E20',
    borderColor:'#1B5E20',
    lineHeight: '1.5', // Hauteur de ligne
    padding: '15px',
    textAlign: 'left', // Alignement du texte à gauche
  },
  button: {
    backgroundColor: '#faebd7', // Green
    color: '#1B5E20',
    padding: '10px',
    fontSize: '20px',
    cursor: 'pointer',
    width: '100%',
    marginTop:'70px',
    borderRadius: '30px',
    border:'3px solid #1B5E20',
    borderColor:'#1B5E20',
  },
};

const AddDocument = () => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const natural = require('natural');
  const tokenizer = new natural.WordTokenizer();
  const stopWords = require('stopwords').english; 
  const lemmatizer = require('wink-lemmatizer');
  //var lemmatizer = new Lemmatizer();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleUpload = async () => {
    try {
      // Ajoutez les informations au Firestore avec un champ d'index simple
      const index = createIndex(name, content);
      const fileData = {
        name: name,
        content: content,
        index: index,
      };

      // Ajoutez au Firestore
      await addFileToFirestore(fileData);

      console.log('File uploaded successfully!');
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Une erreur s\'est produite lors du téléchargement du fichier:', error);
    }
  };

  const createIndex = (title, content) => {
    // Concaténation du titre et contenu, et division en mots et conversion en minuscules
    const text = `${title} ${content}`.toLowerCase();
  
    // Tokenisation du texte
    const tokens = tokenizer.tokenize(text);
  
    // Suppression des stop words
    const filteredTokens = tokens.filter(token => !stopWords.includes(token));
  
    // la lemmatisation
    const lemmatizedTokens = filteredTokens.map(token => lemmatizer.noun(token));
    console.log(lemmatizedTokens);
    const index =  lemmatizedTokens ;
    return index;
  
  };
  const addFileToFirestore = async (fileData) => {
    const filesCollection = collection(db, 'file');
    await addDoc(filesCollection, fileData);
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Title"
        value={name}
        onChange={handleNameChange}
        style={styles.input1}
      />
      <textarea
        type="text"
        placeholder="Content"
        value={content}
        onChange={handleContentChange}
        style={styles.input2}
      />
      <button onClick={handleUpload} style={styles.button}>
        Upload
      </button>
    </div>
  );
};

export default AddDocument;
