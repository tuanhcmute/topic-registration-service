import { Tooltip } from "react-tooltip";
import PropTypes from "prop-types";

function Dropdown({ items }) {
  return (
    <Tooltip disableStyleInjection={true}>
      {items.map((item) => (
        <div></div>
      ))}
    </Tooltip>
  );
}

export default Dropdown;

Dropdown.propTypes = {
  items: PropTypes.array.isRequired,
};
