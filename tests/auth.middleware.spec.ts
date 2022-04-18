import { Test, TestingModule } from '@nestjs/testing';
import * as httpMocks from 'node-mocks-http';

import { AuthMiddleware } from '@/src/common/middlewares/auth.middleware';

jest.setTimeout(100000);

describe('AppController', () => {
  let authMiddleware: AuthMiddleware;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthMiddleware],
      providers: [],
    }).compile();

    authMiddleware = app.get<AuthMiddleware>(AuthMiddleware);
  });

  describe('[POST] /customers', () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();

    it('should return 401', async () => {
      const response: any = await authMiddleware.use(req, res, next);

      expect(response.statusCode).toEqual(401);
    });
  });
});
