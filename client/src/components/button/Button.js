import PropTypes from "prop-types";

function Button(props) {
  const { className } = props;
  return (
    <button
      className={
        className ||
        "py-1 px-2 hover:bg-primary hover:text-white transition-all ease-in-out"
      }
    >
      {props.children}
    </button>
  );
}

export default Button;

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
