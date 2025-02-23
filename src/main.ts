import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { initializeDataSource } from './database/data-source';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const logger = app.get(Logger);
  const configService = app.get<ConfigService>(ConfigService);

  try {
    await initializeDataSource();
    console.log('MikroORM Data Source has been initialized!');
  } catch (err) {
    console.error('Error during MikroORM Data Source initialization', err);
    process.exit(1);
  }

  app.useLogger(logger);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1', {
    exclude: ['/', 'health', 'api', 'api/v1', 'api/docs', 'probe'],
  });

  // Swagger API Documentation Setup
  const options = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription('Task Management API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  const port = configService.get<number>('PORT');
  await app.listen(port);

  logger.log({
    message: 'Server started Successfully',
    port,
    url: `http://localhost:${port}/api/v1`,
  });
}

bootstrap().catch((err) => {
  console.error('Error during bootstrap', err);
  process.exit(1);
});
