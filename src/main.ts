import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/daily-reminder');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const port = parseInt(process.env.PORT ?? '3000', 10);

  const documentBuilder = new DocumentBuilder()
    .setTitle('Daily Reminder API')
    .setDescription('API for Daily Reminder')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const documentFactory = SwaggerModule.createDocument(app, documentBuilder);

  SwaggerModule.setup('docs', app, documentFactory, {
    useGlobalPrefix: true,
  });

  await app.listen(port, () => {
    logger.log(`Server is running on http://localhost:${port}`);
    logger.log(
      `Swagger is running on http://localhost:${port}/api/e-commerce/docs`,
    );
  });
}
bootstrap().catch((error) => {
  const logger = new Logger('Bootstrap');
  logger.error('Erro ao iniciar a aplicação', error);
  process.exit(1);
});
