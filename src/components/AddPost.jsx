// src/components/AddPost.js
import { useState } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Ensure ref is imported
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import './AddPost.css'; // Import the CSS file for styling

const AddPost = ({ isOpen, onRequestClose }) => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);

  const addPost = async (e) => {
    e.preventDefault();
    const newPost = { nom, prenom, description };
    if (photo) {
      const storageRef = ref(storage, `photos/${photo.name}`);
      await uploadBytes(storageRef, photo);
      newPost.photoUrl = await getDownloadURL(storageRef);
    }
    await addDoc(collection(db, 'posts'), newPost);
    setNom('');
    setPrenom('');
    setDescription('');
    setPhoto(null);
    onRequestClose();
    window.location.reload(); // Reload the page after adding the post
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      className="modal"
      overlayClassName="overlay"
    >
      <button className="close-button" onClick={onRequestClose}>×</button>
      <form onSubmit={addPost} className="form">
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Prénom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          className="input"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea"
        ></textarea>
        <input type="file" onChange={handlePhotoChange} className="input-file" />
        <button type="submit" className="submit-button">Ajouter le post</button>
      </form>
    </Modal>
  );
};

AddPost.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default AddPost;
