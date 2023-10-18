export default interface IResponseModel<T> {
  statusCode: number;
  message: string;
  data?: T;
}

export class ResponseModelBuilder<T> {
  private statusCode: number = 200;
  private message: string = "Success";
  private data?: T | undefined;

  constructor() {}

  withStatusCode(statusCode: number): ResponseModelBuilder<T> {
    this.statusCode = statusCode;
    return this;
  }

  withMessage(message: string): ResponseModelBuilder<T> {
    this.message = message;
    return this;
  }

  withData(data: T): ResponseModelBuilder<T> {
    this.data = data;
    return this;
  }

  build(): IResponseModel<T> {
    return {
      statusCode: this.statusCode,
      message: this.message,
      data: this.data,
    };
  }
}
