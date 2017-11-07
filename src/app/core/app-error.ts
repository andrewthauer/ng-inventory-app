/**
 * Standard application error
 *
 * @export
 * @class AppError
 * @extends {Error}
 */
export class AppError extends Error {
  innerError: Error;

  constructor(message?: string, innerError: Error = null) {
    super(message);
    this.innerError = innerError;
  }

  static of(innerError?: Error) {
    return new AppError('Ops, something went wrong', innerError);
  }

  static create(message?: string, innerError?: Error) {
    return new AppError(message, innerError);
  }
}
