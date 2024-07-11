import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function CategoryLink({ name }) {
  return (
    <Link to={`/categorias/${name}`}>
      <button
        type="button"
        className="list-group-item list-group-item-action text-center"
      >
        {name}
      </button>
    </Link>
  );
}

CategoryLink.propTypes = {
  name: PropTypes.string.isRequired,
};

export default CategoryLink;