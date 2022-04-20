import { ApiProperty } from '@nestjs/swagger';

import {
  CustomerRegisterController,
  CustomerUpdateController,
} from '@/presentation/controllers';

/**
 * as classes são implementadas aqui para nao sujar as regras de negócio da nossa aplicacao
 * com implementações do Swagger/Nest.js Framework e ainda assim garantir
 * que respeitarão o contrato definido na interface de cada controller em questao
 */

export class CustomerRegisterDTO
  implements CustomerRegisterController.CustomerRegisterDTO
{
  @ApiProperty()
  document: number;

  @ApiProperty()
  name: string;
}

/**
 * hoje o CustomerUpdateDTO possui os mesmos atributos da CustomerRegisterDTO
 * mas como isso poderia mudar, é interessante manter em classes separadas
 * para garantirmos que a documentação seja consistente
 */

export class CustomerUpdateDTO
  implements CustomerUpdateController.CustomerUpdateDTO
{
  @ApiProperty()
  document: number;

  @ApiProperty()
  name: string;
}
