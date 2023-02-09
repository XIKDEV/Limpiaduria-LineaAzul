import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ErrorInterceptor } from './common/interceptors/error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.setGlobalPrefix('api/v2');

  app.useGlobalInterceptors(new ErrorInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle('Limpiaduria Linea Azul')
    .setDescription('Punto de venta de limpiaduria linea azul')
    .setVersion('2.0')
    .addServer('http://localhost:3000/')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/v2/documentation', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
