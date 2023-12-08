import React, { useState } from 'react';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore'; // Import necessary Firestore functions
import { storage, db } from '../firebase.js';
import NavigationBar from './NavigationBar';

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
    borderRadius: '10px',
    boxShadow: '3px 4px 8px rgba(255, 224, 178, 1)',
    
  },
  input: {
    marginTop:'85px',
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
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
    marginTop:'90px',
    borderRadius: '30px',
    border:'3px solid #1B5E20',
    borderColor:'#1B5E20'
  },
};

const AddDocument = () => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

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
    // Concaténez le titre et le contenu, divisez en mots et convertissez en minuscules
    const words = (title + ' ' + content).toLowerCase().split(/\s+/);
    const wordFrequencyMap = {};
  
    // Liste des pronoms et mots sans importance à exclure de l'index
    const stopWords = ['le', 'la', 'les', 'de', 'du', 'en', 'et', 'un', 'une', 'je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles', 'qui', 'que', 'quoi', 'à', 'ce', 'cette', 'avec', 'sur', 'sous', 'pour', 'par', 'pas'];
  
    // Fonction pour accentuer les mots avec l'algorithme de CARRY
    const carryAccentuation = (word) => {
      // Votre logique d'accentuation ici, par exemple, doubler chaque lettre
      return word.split('').map(letter => letter + letter).join('');
    };
  
    // Filtrer les mots vides et les mots à exclure
    const filteredWords = words.filter(word => word !== '' && !stopWords.includes(word));
  
    // Compter la fréquence de chaque mot
    filteredWords.forEach(word => {
      wordFrequencyMap[word] = (wordFrequencyMap[word] || 0) + 1;
    });
  
    // Trier les mots par fréquence décroissante
    const sortedWords = Object.keys(wordFrequencyMap).sort((a, b) => wordFrequencyMap[b] - wordFrequencyMap[a]);
  
    // Supprimer les doublons et conserver les 5 premiers mots (ajustez selon vos besoins)
    const uniqueSortedWords = Array.from(new Set(sortedWords)).slice(0, 5);
  
    // Appliquer l'accentuation de CARRY à chaque mot
    const accentuatedWords = uniqueSortedWords.map(word => carryAccentuation(word));
  
    // Retourner le titre et les mots accentués pour l'index
    return { title, index: accentuatedWords };
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
