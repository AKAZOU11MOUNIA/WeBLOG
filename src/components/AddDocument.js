import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore'; // Import necessary Firestore functions
import {  db } from '../firebase.js';



const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f5f5dc', // Beige
    maxWidth: '400px',
    margin: 'auto',
  },
  input: {
    marginBottom: '10px',
    padding: '8px',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#faebd7', // Green
    color: '#cd853f',
    padding: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
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
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Content"
        value={content}
        onChange={handleContentChange}
        style={styles.input}
      />
      <button onClick={handleUpload} style={styles.button}>
        Upload
      </button>
    </div>
  );
};

export default AddDocument;
