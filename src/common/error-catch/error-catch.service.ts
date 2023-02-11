import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { EExceptionsOptions } from '../interfaces';
import { IParamsExceptionsOptions } from '../interfaces/paramsExceptionsOptiones.interface';

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

  notExitsCatch(module?: string): HttpException {
    throw new ConflictException(`${module} was not found`);
  }

  exceptionsOptions({ message }: IParamsExceptionsOptions): HttpException {
    switch (message) {
      case EExceptionsOptions.notFoundClient:
        return this.notExitsCatch('Client');
      case EExceptionsOptions.notFoundGarment:
        return this.notExitsCatch('Garment');
      case EExceptionsOptions.notFoundNote:
        return this.notExitsCatch('Note');

      default:
        throw new InternalServerErrorException(message);
    }
  }
}
