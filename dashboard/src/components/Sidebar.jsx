import { Link } from "react-router-dom";

export default function Sidebar() {
  const iconStyle = {
    fontSize: "1.2rem",
    color: "#58151c",
  }; 

  const colorH3 = {
    color: "#58151c" 
  }

  return (
    <nav>
      <section>
        <h3 style={ colorH3 } >Opciones</h3>
        <ul>
          <li>
            <Link to="/search">
              <i className="bi bi-search" style={iconStyle}></i> Buscar
            </Link>
          </li>
          <li>
            <Link to="/bicicletas">
              <i className="bi bi-bicycle" style={iconStyle}></i> Bicicletas
            </Link>
          </li>
          <li>
            <Link to="/categorias">
              <i className="bi bi-c-square-fill" style={iconStyle}></i> Categorias
            </Link>
          </li> 
          <li>
            <Link to="/usuarios">
              <i className="bi bi-people-fill" style={iconStyle}></i> Usuarios
            </Link>
          </li>  
          <li>
            <Link to= "/createBike">
            <i className="bi bi-patch-plus-fill" style={iconStyle}></i> Crear Bicicleta
            </Link>
          </li> 
        </ul>
      </section>
    </nav>
  );
}