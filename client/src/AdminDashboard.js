import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:5000/api/users');
    setUsers(response.data);
  };

  const onChangeToAdmin = () => {
    Cookies.remove("jwt_token");
    navigate('/'); // Navigate to the home page
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.socialMediaHandle}</p>
            <div>
              {user.images.split(',').map((image, index) => (
                <img key={index} src={image} alt="Uploaded" width="100" />
              ))}
            </div>
          </li>
        ))}
      </ul>
      <button onClick={onChangeToAdmin}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
