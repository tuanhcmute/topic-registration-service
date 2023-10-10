import PropTypes from "prop-types";

function Banner(props) {
  const { title, className } = props;

  return (
    <div
      className={
        className ||
        "xl:h-[300px] lg:h-72 md:h-64 h-60 bg-banner bg-no-repeat bg-center bg-cover flex items-center justify-center text-primary font-Roboto text-3xl font-bold shadow-sm"
      }
    >
      {title}
    </div>
  );
}

export default Banner;

Banner.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};
