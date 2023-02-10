import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { ResponseGenericDto } from '../response/reponse-generic.dto';

@Injectable()
export class ErrorCatchService {
  errorCatch() {
    throw new InternalServerErrorException(
      new ResponseGenericDto().createResponse(
        false,
        'Unexpected error, check the server'
      )
    );
  }

  notExitsCatch(id: number, module?: string) {
    throw new NotFoundException(`${module} was not found with id: ${id}`);
  }
}
