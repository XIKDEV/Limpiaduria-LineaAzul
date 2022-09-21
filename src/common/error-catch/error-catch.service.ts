import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { ResponseGenericDto } from '../response/reponse-generic.dto';

@Injectable()
export class ErrorCatchService {
  errorCatch() {
    throw new InternalServerErrorException(
      new ResponseGenericDto().createResponse(
        false,
        'Unexpected error, check the server',
      ),
    );
  }

  notExitsCatch(id: number) {
    return new ResponseGenericDto().createResponse(
      false,
      `This client not exists with id: ${id}`,
    );
  }
}
