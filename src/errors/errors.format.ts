export class BadRequestError extends Error {
  public code: number;
  public response: string;
  constructor (message: string) {
      super(message);
      this.code = 400;
      this.response = message;
  }
}

export class UnauthorizedError extends Error {
  public code: number;
  public response: string;
  constructor (message: string) {
      super(message);
      this.code = 401;
      this.response = message;
  }
}

export class ForbiddenError extends Error {
  public code: number;
  public response: string;
  constructor (message: string) {
      super(message);
      this.code = 403;
      this.response = message;
  }
}

export class NotFoundError extends Error {
  public code: number;
  public response: string;
  constructor (message: string) {
      super(message);
      this.code = 404;
      this.response = message;
  }
}