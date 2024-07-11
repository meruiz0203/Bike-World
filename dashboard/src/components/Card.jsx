import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import "./Dashboard.css";

// Componente Card sin cambios
function Card({ title, metric }) {
  return (
    <div className="card card-container">
      <h2 className="card-title">{title}</h2>
      <p className="card-metric">{metric}</p>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  metric: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

// Componente Bikes
const Bikes = () => {
  const [bikesData, setBikesData] = useState({ count: 0, categories: [] });
  console.log(bikesData);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3030/api/products');
      const result = await response.json();
      setBikesData({
        count: result.data.count,
        categories: result.data.categories || [],
      });
    };

    fetchData();
  }, []);

  return (
    <>
      <Card title="Total Bicicletas" metric={bikesData.count} />
      <Card title="Total Categorías" metric={bikesData.categories.length} />
    </>
  );
};

// Componente Users
const Users = () => {
  const [usersData, setUsersData] = useState({ users: [] });

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch('http://localhost:3030/api/users');
        const result = await response.json();
        setUsersData({
          users: result.data.users,
        });
    };

    fetchData();
  }, []);

  return <Card title="Total Usuarios" metric={usersData.users.length} />;
};

// MainComponent ahora incluye los componentes Bikes y Users
export default function MainComponent() {
  return (
    <div className="card-container">
      <Bikes />
      <Users />
    </div>
  );
}
