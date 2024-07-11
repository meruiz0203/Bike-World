import PropTypes from "prop-types";

function CategoryItem({ name }) {
  return (
    <button
      type="button"
      className=""
    >
      {name}
    </button>
  );
}

CategoryItem.propTypes = {
  name: PropTypes.string.isRequired,
};

export default CategoryItem;
