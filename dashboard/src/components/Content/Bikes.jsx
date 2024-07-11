import { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom/cjs/react-router-dom.min'; 

const Bikes = () => {
  const [bikesData, setBikesData] = useState({ count: 0, countByCategory: 0, bikes: [] });  

  console.log('bikeData', bikesData);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3030/api/products');
        const result = await response.json();
        setBikesData({
          count: result.data.count,
          countByCategory: result.data.countByCategory,
          bikes: result.data.bikes,
        });
      } catch (error) {
        console.error('Error fetching bikes:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <div className="bike-card-list">
        {bikesData.bikes.length === 0 ? (
          <p>Cargando...</p>
        ) : (
          bikesData.bikes.map((bike) => (
            <div className="bike-card "key={bike.id}>
              <h2>{bike.modelName}</h2>
              <p className="bike-title" >Marca: {bike.brand}</p>
              <p className="bold">Categoría: {bike.category}</p>
              <img src={bike.image} alt={bike.name} />
              <p  className="bike-info">Descripción: {bike.description}</p>
              <p  className="bold">Precio: $ {bike.price}</p>
              <Link to={{
                pathname: `/editBike/${bike.id}`,
                state: { bikeData: bike }
              }}>
              <button className="button">
               Editar
              </button>

              </Link>
            </div>
          ))
        )}
      </div>

    </div>
  )
};

export default Bikes;
