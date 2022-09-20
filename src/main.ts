import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ErrorInterceptor } from './common/interceptors/error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2');

  app.useGlobalInterceptors(new ErrorInterceptor());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
