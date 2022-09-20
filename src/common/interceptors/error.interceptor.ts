import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';

import { catchError, Observable, timeout, TimeoutError } from 'rxjs';

import { ResponseGenericDto } from '../response/reponse-generic.dto';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(5000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          throw new RequestTimeoutException(
            new ResponseGenericDto().createResponse(false, err.message),
          );
        }
        throw new BadRequestException(
          new ResponseGenericDto().createResponse(false, err.message),
        );
      }),
    );
  }
}
