import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'));
  const config = new DocumentBuilder()
    .setTitle('Kanban API')
    .setDescription('The Kanban board API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  await app.listen(process.env.PORT ?? 8001);
  console.log(
    `🚀 Application is running on: http://localhost:${process.env.PORT ?? 8001}`,
  );
  console.log(
    `📖 Swagger docs available at: http://localhost:${process.env.PORT ?? 8001}/api`,
  );
}
void bootstrap();
