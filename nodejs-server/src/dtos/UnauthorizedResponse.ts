import { ErrorResponse } from "../interfaces/errorResponse.interface";

export class UnauthorizedResponse implements ErrorResponse {
  public readonly code: number = 401;
  public readonly message: string;

  constructor(message: string) {
    this.message = message;
  }
}
