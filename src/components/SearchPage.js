import React, { useState } from 'react';
import {  collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      console.log('Début de la fonction handleSearch');

      try {
        console.log('Instance Firebase (db) :', db);

        
        

        const filesCollection = collection(db, 'file');

        // Utilisez une requête pour le nom
        const nameQuery = query(filesCollection, where('name', '>=', searchQuery));
        const nameSnapshot = await getDocs(nameQuery);
        const nameData = nameSnapshot.docs.map(doc => doc.data());

        // Utilisez une requête pour le contenu
        const contentQuery = query(filesCollection, where('content', '>=', searchQuery));
        const contentSnapshot = await getDocs(contentQuery);
        const contentData = contentSnapshot.docs.map(doc => doc.data());

        // Fusionnez les résultats
        const mergedResults = [...nameData, ...contentData];

        // Supprimez les doublons si nécessaire
        const uniqueResults = mergedResults.filter((value, index, self) => self.indexOf(value) === index);

        // Affichez les données récupérées
        console.log('Données récupérées :', uniqueResults);

        setResults(uniqueResults);
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de Firestore :', error);
      }
    } catch (error) {
      console.error('Erreur lors de la recherche :', error);
    }
  };

  return (
    <div>
      <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      

<ul>
  {results.map((result, index) => (
    <li key={`${result.name}_${index}`}>{result.name}</li>
  ))}
</ul>



    </div>
  );
};

export default SearchPage;
