import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { makeCustomerRegisterController } from '@/main/factories';
import { makeCustomerFindByIdController } from '@/main/factories/customers/controllers/customer-find-by-id-controller-factory';

@Controller('customers')
export class AppController {
  @Post()
  create(@Body() body: any) {
    return makeCustomerRegisterController().handle({
      body,
    });
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return makeCustomerFindByIdController().handle({
      params: {
        id,
      },
    });
  }
}
