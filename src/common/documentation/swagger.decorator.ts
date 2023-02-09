import { applyDecorators, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { ERestApi, ISwagger } from '../interfaces';
import { ResponseGenericDto } from '../response/reponse-generic.dto';

export const Swagger = ({ restApi, url, modules }: ISwagger) => {
  switch (restApi) {
    case ERestApi.get:
      return applyDecorators(
        Get(url),
        ApiResponse({
          description: 'Information found',
          status: 200,
          type: ResponseGenericDto,
        })
      );
    default:
      break;
  }
};
