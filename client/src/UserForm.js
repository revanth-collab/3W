import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./App.css"

const UserForm = () => {
  const [name, setName] = useState('');
  const [socialMediaHandle, setSocialMediaHandle] = useState('');
  const [images, setImages] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  const handleImageChange = (event) => {
    setImages(event.target.files);
  };

  const adminPage = () => {
    navigate('/'); // Navigate to admin page
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('socialMediaHandle', socialMediaHandle);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    await axios.post('http://localhost:5000/api/users', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Clear the form
    setName('');
    setSocialMediaHandle('');
    setImages([]);
  };

  return (
    <div className="Admin">
      <form onSubmit={handleSubmit} className='adminCard'>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className='input-element'
      />
      <input
        type="text"
        placeholder="Social Media Handle"
        value={socialMediaHandle}
        onChange={(e) => setSocialMediaHandle(e.target.value)}
        required
        className='input-element'
      />
      <input
        type="file"
        multiple
        onChange={handleImageChange}
        required
        className='input-element'
      />
      <button type="submit" className='button'>Submit</button>
      <button type="button" className='button' onClick={adminPage}>Admin Page</button> {/* Pass function reference */}
    </form>
    </div>
  );
};

export default UserForm;
