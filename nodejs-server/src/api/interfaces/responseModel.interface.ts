export default interface IResponseModel<T> {
  statusCode: number;
  message: string;
  data?: T;
}
