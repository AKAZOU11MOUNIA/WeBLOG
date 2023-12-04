// FileUploader.js
import React, { useState } from 'react';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase.js';
import './FileUploader.css'; // Importez le fichier CSS

const FileUploader = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error('Aucun fichier sélectionné.');
      return;
    }

    // Utilisez la référence directe à storage
    const storageRef = ref(storage, `files/${file.name}`);

    try {
      await uploadBytesResumable(storageRef, file);

      console.log('File uploaded successfully!');
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Une erreur s\'est produite lors du téléchargement du fichier:', error);
    }
  };

  return (
    <div className="container">
      <label htmlFor="file" className="label">Choisir un fichier</label>
      <input
        type="file"
        id="file"
        onChange={handleFileChange}
        className="input"
      />
      <button onClick={handleUpload} className="button">Télécharger</button>
    </div>
  );
};

export default FileUploader;
