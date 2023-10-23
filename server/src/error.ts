export enum ApiErrorType {
  EntityAlreadyExist,
  NotFound,
  InternalServerError,
  ValidationError,
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
