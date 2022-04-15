import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';

import { makeCustomerRegisterController } from '@/main/factories';
import { makeCustomerFindByIdController } from '@/main/factories/customers/controllers/customer-find-by-id-controller-factory';
import { Response } from 'express';

@Controller('customers')
export class AppController {
  @Post()
  async create(@Body() body: any, @Res() res: Response) {
    const response = await makeCustomerRegisterController().handle({
      body,
    });

    return res.status(response.statusCode).json(response);
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    const response = await makeCustomerFindByIdController().handle({
      params: {
        id,
      },
    });

    return res.status(response.statusCode).json(response);
  }
}
