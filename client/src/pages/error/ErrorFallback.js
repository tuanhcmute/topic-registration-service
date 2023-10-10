import React from "react";

function ErrorFallback(props) {
  const { error } = props;
  return <div className='text-red'>{error.message}</div>;
}

export default ErrorFallback;
