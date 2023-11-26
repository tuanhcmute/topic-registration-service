import { ReasonPhrases } from "http-status-codes";

class InternalServerErrorException extends Error {
  constructor(message: string = ReasonPhrases.INTERNAL_SERVER_ERROR) {
    super(message);
    this.name = "InternalServerErrorException";
    Object.setPrototypeOf(this, InternalServerErrorException.prototype);
  }
}

export default InternalServerErrorException;
