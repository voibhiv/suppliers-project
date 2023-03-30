export class BadRequestError extends Error {
  public code: number;
  public data: string;
  constructor(message: string) {
    super(message);
    this.code = 400;
    this.data = message;
  }
}

export class UnauthorizedError extends Error {
  public code: number;
  public data: string;
  constructor(message: string) {
    super(message);
    this.code = 401;
    this.data = message;
  }
}

export class ForbiddenError extends Error {
  public code: number;
  public data: string;
  constructor(message: string) {
    super(message);
    this.code = 403;
    this.data = message;
  }
}

export class NotFoundError extends Error {
  public code: number;
  public data: string;
  constructor(message: string) {
    super(message);
    this.code = 404;
    this.data = message;
  }
}

export class ConflictError extends Error {
  public code: number;
  public data: string;
  constructor(message: string) {
    super(message);
    this.code = 409;
    this.data = message;
  }
}
