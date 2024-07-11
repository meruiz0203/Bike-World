/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

const Users = () => {
  const [UsersData, setUsersData] = useState({ users: [] });

  useEffect(() => {
    // Realiza la solicitud al backend para obtener datos de usuarios
    const fetchData = async () => {
      const response = await fetch('http://localhost:3030/api/users'); // Ajusta la URL según tu backend
      const result = await response.json();
      setUsersData({
        users: result.data.users
      });
    };

    fetchData();
  }, []); 


  return (
    <div >
      <h2>Datos de Usuarios</h2>
      {UsersData.users.length === 0 ? (
        <p>Cargando...</p>
      ) : (
        UsersData.users.map(user => (
          <div className="user-card" key={user.id}>
            <h3>Nombre: {user.name}</h3>
            <h3>Apellido: {user.lastName}</h3>
            <p>Email: {user.email}</p>
            <p> Perfil de usuario: {user.role}</p>
            <img className="user-image" src={user.avatar} alt={user.name} />
          </div>
        ))
      )}
    </div>
  );
};

export default Users;
