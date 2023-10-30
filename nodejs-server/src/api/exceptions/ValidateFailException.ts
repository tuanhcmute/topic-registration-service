class ValidateException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidateException";
  }
}

export default ValidateException;
