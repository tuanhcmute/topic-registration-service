import { Tooltip } from "react-tooltip";
import PropTypes from "prop-types";

function Dropdown(props) {
  const { className, children, anchorSelect, place } = props;

  return (
    <Tooltip
      disableStyleInjection={true}
      anchorSelect={anchorSelect}
      place={place || "bottom"}
      clickable
      className={className}
      classNameArrow='hidden'
    >
      {children}
    </Tooltip>
  );
}

export default Dropdown;

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  anchorSelect: PropTypes.string.isRequired,
  place: PropTypes.string,
};
