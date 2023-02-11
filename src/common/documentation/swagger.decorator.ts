import {
  applyDecorators,
  Delete,
  Get,
  Patch,
  Post,
} from '@nestjs/common/decorators';
import {
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { EGenericResponse, ERestApi, ISwagger } from '../interfaces';
import { ResponseGenericDto, ResponseGenericInfoDto } from '../response';

export const Swagger = ({ restApi, url, description }: ISwagger) => {
  switch (restApi) {
    case ERestApi.getAll:
      return applyDecorators(
        Get(url),
        ApiInternalServerErrorResponse({
          description: EGenericResponse.serverError,
          type: ResponseGenericDto,
        }),
        ApiResponse({
          description: description || EGenericResponse.found,
          type: ResponseGenericDto,
          status: 200,
        })
      );
    case ERestApi.getOne:
      return applyDecorators(
        Get(url),
        ApiResponse({
          description: description || EGenericResponse.found,
          status: 200,
          type: ResponseGenericInfoDto,
        }),
        ApiInternalServerErrorResponse({
          description: EGenericResponse.serverError,
          type: ResponseGenericDto,
        }),
        ApiConflictResponse({
          description: EGenericResponse.conflictError,
          type: ResponseGenericDto,
        }),
        ApiUnprocessableEntityResponse({
          description: EGenericResponse.unprocessableEntity,
          type: ResponseGenericDto,
        })
      );
    case ERestApi.post:
      return applyDecorators(
        Post(url),
        ApiResponse({
          description: description || EGenericResponse.create,
          status: 201,
          type: ResponseGenericDto,
        }),
        ApiInternalServerErrorResponse({
          description: EGenericResponse.serverError,
          type: ResponseGenericDto,
        }),
        ApiUnprocessableEntityResponse({
          description: EGenericResponse.unprocessableEntity,
          type: ResponseGenericDto,
        })
      );
    case ERestApi.patch:
      return applyDecorators(
        Patch(url),
        ApiResponse({
          description: description || EGenericResponse.update,
          status: 200,
          type: ResponseGenericInfoDto,
        }),
        ApiInternalServerErrorResponse({
          description: EGenericResponse.serverError,
          type: ResponseGenericDto,
        }),
        ApiUnprocessableEntityResponse({
          description: EGenericResponse.unprocessableEntity,
          type: ResponseGenericDto,
        }),
        ApiConflictResponse({
          description: EGenericResponse.conflictError,
          type: ResponseGenericDto,
        })
      );
    case ERestApi.delete:
      return applyDecorators(
        Delete(url),
        ApiResponse({
          description: description || EGenericResponse.delete,
          status: 200,
          type: ResponseGenericInfoDto,
        }),
        ApiInternalServerErrorResponse({
          description: EGenericResponse.serverError,
          type: ResponseGenericDto,
        }),
        ApiUnprocessableEntityResponse({
          description: EGenericResponse.unprocessableEntity,
          type: ResponseGenericDto,
        }),
        ApiConflictResponse({
          description: EGenericResponse.conflictError,
          type: ResponseGenericDto,
        })
      );
    default:
      break;
  }
};
