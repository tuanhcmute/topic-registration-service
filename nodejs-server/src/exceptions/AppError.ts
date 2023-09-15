export class NotFoundError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    // Capture the stack trace, excluding the constructor call
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}

export class ValidatorError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    // Capture the stack trace, excluding the constructor call
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}

export class PasswordNotCorrectError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    // Capture the stack trace, excluding the constructor call
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}

export class UnauthorizedError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    // Capture the stack trace, excluding the constructor call
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}
