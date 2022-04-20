import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';

import {
  makeCustomerRegisterController,
  makeCustomerUpdateController,
  makeCustomerFindByIdController,
} from '@/main/factories';
import { Response } from 'express';
import {
  CustomerRegisterController,
  CustomerUpdateController,
} from '@/presentation/controllers';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

import { CustomerRegisterDTO, CustomerUpdateDTO } from '@/src/app/common/docs';

@ApiTags('CUSTOMERS')
@Controller('customers')
export class AppController {
  @ApiBearerAuth()
  @ApiBody({ type: CustomerRegisterDTO })
  @Post()
  async create(
    @Body() body: CustomerRegisterController.CustomerRegisterDTO,
    @Res() res: Response,
  ) {
    const response = await makeCustomerRegisterController().handle({
      params: body,
    });

    return res.status(response.statusCode).json(response);
  }

  @ApiBearerAuth()
  @Get(':id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    const response = await makeCustomerFindByIdController().handle({
      params: {
        id,
      },
    });

    return res.status(response.statusCode).json(response);
  }

  @ApiBearerAuth()
  @ApiBody({ type: CustomerUpdateDTO })
  @Put(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() body: CustomerUpdateController.CustomerUpdateDTO,
    @Res() res: Response,
  ) {
    const response = await makeCustomerUpdateController().handle({
      params: {
        id,
        data: body,
      },
    });

    return res.status(response.statusCode).json(response);
  }
}
