class UserNotFoundException extends Error {
  constructor(message: string = "User not found") {
    super(message);
    this.name = "UserNotFoundException";
    Object.setPrototypeOf(this, UserNotFoundException.prototype);
  }
}

export default UserNotFoundException;
