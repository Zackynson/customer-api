export class ObjectValidationError extends Error {
  constructor(message?: string) {
    super(message || 'An error was thrown when validating an object.');
    this.name = 'ObjectValidationError';
  }
}
