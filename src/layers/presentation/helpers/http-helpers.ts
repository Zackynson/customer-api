// import { UnauthorizedError } from '@/presentation/errors';
import { HttpResponse } from '@/presentation/protocols';
import { UnauthorizedError } from '../errors';

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data,
});

// export const noContent = (): HttpResponse => ({
//   statusCode: 204,
//   body: undefined,
// });

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error.message,
});

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError().message,
});

// export const forbidden = (error: Error): HttpResponse => ({
//   statusCode: 403,
//   body: error,
// });

export const notFound = (error?: Error): HttpResponse => ({
  statusCode: 404,
  body: error.message || 'Not found.',
});

export const serverError = (error?: Error): HttpResponse => ({
  statusCode: 500,
  body: error.message || 'Internal server error.',
});

export const notAvailable = (error?: Error): HttpResponse => ({
  statusCode: 502,
  body: error.message || 'Service not available.',
});
