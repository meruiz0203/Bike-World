import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const CategoryDetail = ({ match }) => {
  const { name } = match.params;
  const [categoryData, setCategoryData] = useState({
    count: 0,
    bikes: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3030/api/products`);
      const result = await response.json();
      
      // Buscar datos de la categoría seleccionada
      const category = result.data.countByCategory[name] || { count: 0, bikes: [] };
      
      setCategoryData({
        count: category.count,
        bikes: category.bikes,
      });
    };

    fetchData();
  }, [name]);

  return (
    <div>
      <h2>Categoría Seleccionada: 
       <p>{name}</p> 
       </h2>
      <h4>Cantidad: {categoryData.count}</h4>
      <h3>Listado:</h3>
      <ul className="category-list">
        {categoryData.bikes.map((bike) => (
          <li key={bike.id} className="category-item">
            
         
              
              <div className="bike-info">
              <h4>{bike.modelName}</h4>
              <p>{bike.description}</p>
              <p>Precio: $ {bike.price}</p>
            </div>
            <div>
              <img src={bike.image} alt={bike.name} className="bike-image" style={{ maxWidth: "100px" }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

CategoryDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default CategoryDetail;