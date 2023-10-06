import PropsType from "prop-types";

function Button(props) {
  return (
    <button className='py-1 px-2 hover:bg-primary hover:text-white transition-all ease-in-out'>
      {props.children}
    </button>
  );
}

export default Button;

Button.propsType = {
  children: PropsType.node.isRequired,
};
