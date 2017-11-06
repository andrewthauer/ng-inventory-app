export class AppError extends Error {
  innerError: Error;
  constructor(message?: string, innerError: Error = null) {
    super(message);
    this.innerError = innerError;
  }
}

export const appError = (err: Error): any => new AppError('Ops, something went wrong :(', err);
