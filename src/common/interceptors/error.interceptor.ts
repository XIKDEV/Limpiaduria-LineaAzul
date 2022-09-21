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
    return next
      .handle()
      .pipe(
        catchError(async (err) =>
          new ResponseGenericDto().createResponse(
            false,
            err.response.message[0],
          ),
        ),
      );
  }
}
