export enum ApiErrorType {
  Conflict,
  BadRequest,
  NotFound,
  InternalServerError,
}

export class ApiError extends Error {
  error: ApiErrorType;
  message: string;

  constructor(error: ApiErrorType, message: string) {
    super(message);
    this.error = error;
    this.message = message;
  }
}
