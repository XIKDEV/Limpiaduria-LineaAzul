import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnprocessableEntityException,
} from '@nestjs/common';

import { catchError, Observable } from 'rxjs';

import { ResponseGenericDto } from '../response/reponse-generic.dto';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(async (err) => {
        throw new BadRequestException(
          new ResponseGenericDto().createResponse(false, err.response.message)
        );
      })
    );
  }
}
