import { Module } from '@nestjs/common';
import { ErrorCatchService } from './error-catch/error-catch.service';

@Module({
  providers: [ErrorCatchService],
  exports: [ErrorCatchService],
})
export class CommonModule {}
