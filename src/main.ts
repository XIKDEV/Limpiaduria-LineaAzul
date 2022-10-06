import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ErrorInterceptor } from './common/interceptors/error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.setGlobalPrefix('api/v2');

  app.useGlobalInterceptors(new ErrorInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
