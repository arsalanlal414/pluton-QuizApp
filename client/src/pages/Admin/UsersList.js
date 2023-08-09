import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userslist.scss';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEditClick = (userId) => {
    setEditingUserId(userId);
  };

  const handleSaveClick = async (editedUser) => {
    try {
      await axios.put(`http://localhost:5001/api/users/${editedUser._id}`, editedUser);
      setEditingUserId(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteClick = async (userId) => {
    try {
      await axios.delete(`http://localhost:5001/api/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleInputChange = (event, userId, key) => {
    const updatedUsers = users.map(user => {
      if (user._id === userId) {
        return { ...user, [key]: event.target.value };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  console.log(users)
  return (
    <div className='admin-users'>
      <h2>Admin Users</h2>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Username</th>
            <th>Email</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>
                {editingUserId === user._id ? (
                  <input
                    value={user.username}
                    onChange={(e) => handleInputChange(e, user._id, 'username')}
                  />
                ) : (
                  user.username
                )}
              </td>
              <td>
                {editingUserId === user._id ? (
                  <input
                    value={user.email}
                    onChange={(e) => handleInputChange(e, user._id, 'email')}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>{formatDate(user.createdAt)}</td>
              <td>
                {editingUserId === user._id ? (
                  <button onClick={() => handleSaveClick(user)}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(user._id)}>Edit</button>
                    <button onClick={() => handleDeleteClick(user._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
