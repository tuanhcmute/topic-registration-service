interface ResponseModel<T> {
  statusCode: number;
  message: string;
  data?: T;
}

export { ResponseModel };
