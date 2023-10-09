function wrapPromise(promise) {
  let status = "pending";
  let response;

  console.log(status);
  const suspender = promise.then(
    (res) => {
      status = "success";
      response = res;
      console.log(status);
    },
    (err) => {
      status = "error";
      response = err;
      console.log(status);
    }
  );

  const handler = {
    pending: () => {
      console.log("throw suspender");
      throw suspender;
    },
    error: () => {
      throw response;
    },
    success: () => {
      console.log("response");
      return response;
    },
  };

  const read = () => {
    console.log("read");
    const result = handler[status]();
    return result;
  };
  return { read };
}

export default wrapPromise;
