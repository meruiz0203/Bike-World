import { useState, useEffect } from 'react'; 
import PropTypes from 'prop-types'; 

const EditBike = (props) => {
  console.log('props',props); 
  const initialBikeData = props.location.state.bikeData;
  
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

  const [bikeData, setBikeData] = useState({
    modelName: '',
    brand: '',
    category: '',
    size: '',
    color: '',
    description: '',
    price: '',
    image: '',
    ...initialBikeData,
  });

  useEffect(() => { 
    const fetchData = async () => {
      const response = await fetch('http://localhost:3030/api/products');
      const data = await response.json();

      const { brands, categories, sizes, colors } = data.data;

      setCategories(categories);
      setBrands(brands);
      setSizes(sizes);
      setColors(colors);
    };

    fetchData();
  }, []); 

  console.log('brands', brands);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBikeData({ ...bikeData, [name]: value });
  }; 

  const handleImageChange = (e) => { 
    const file = e.target.files[0]; 
    console.log('file', file);
    setBikeData({ ...bikeData, image: file});
  }; 

  const handleDelete = async () => {
    // Llamada a la API para eliminar la bicicleta
    const response = await fetch(`http://localhost:3030/api/deleteBike/${initialBikeData.id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log('Bike deleted:', data);
    // Redirigir a la página principal o realizar otras acciones según sea necesario
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('modelName', bikeData.modelName);
    formData.append('brand', bikeData.brand);
    formData.append('category', bikeData.category);
    formData.append('size', bikeData.size);
    formData.append('color', bikeData.color);
    formData.append('description', bikeData.description);
    formData.append('price', bikeData.price);
    formData.append('image', bikeData.image);

    // Llamada a la API para actualizar la bicicleta
    const response = await fetch(`http://localhost:3030/api/updateBikes/${initialBikeData.id}`, {
    method: 'PUT',
    body: formData,
  }); 
  const data = await response.json();
  console.log('Bike updated:', data);
  };
  return (
    <form onSubmit={handleSubmit} className="card card-container">
      <label>
        Nombre del modelo:
        <input type="text" name="modelName" value={bikeData.modelName} onChange={handleInputChange} />
      </label>
      <label>
        Brand:
        <select name="brand" onChange={handleInputChange}>
          <option value={bikeData.brand} key={bikeData.id}>{bikeData.brand}</option>
          {brands.map((brand) => (
          brand.name != bikeData.brand && <option key={brand.id}>
          {brand.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Category:
        <select name="category"  onChange={handleInputChange}>
        <option value={bikeData.category} key={bikeData.id}>{bikeData.category}</option>
          {categories.map((category) => (
          category.name != bikeData.category && <option key={category.id}>
          {category.name}
          </option>
          ))}
        </select>
      </label>

      <label>
        Size:
        <select name="size" onChange={handleInputChange}>
        <option value={bikeData.size} key={bikeData.id}>{bikeData.size}</option>
          {sizes.map((size) => (
          size.name != bikeData.size && <option key={size.id}>
          {size.name}
          </option>
          ))}
        </select>
      </label>

      <label>
        Color:
        <select name="color" onChange={handleInputChange}>
        <option value={bikeData.color} key={bikeData.id}>{bikeData.color}</option>
          {colors.map((color) => (
          color.name != bikeData.color && <option key={color.id}>
          {color.name}
          </option>
          ))}
        </select>
      </label>

      <label>
        Description:
        <input type="text" name="description" value={bikeData.description} onChange={handleInputChange} />
      </label>

      <label>
        Price:
        <input type="text" name="price" value={bikeData.price} onChange={handleInputChange} />
      </label>

      <label>
        <input type="file" name="image" onChange={handleImageChange} />
        <input type="image" name="image" src={bikeData.image} />
      </label>

      <button type="submit">Update Bike</button> 
      <button type="button" onClick={handleDelete}>Delete Bike</button>
    </form>
  );
}; 

EditBike.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      bikeData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        // Agrega otras propiedades según sea necesario
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default EditBike;
