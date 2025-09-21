import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Kanban API')
    .setDescription('The Kanban board API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 8005);
  console.log(
    `🚀 Application is running on: http://localhost:${process.env.PORT ?? 8005}`,
  );
  console.log(
    `📖 Swagger docs available at: http://localhost:${process.env.PORT ?? 8005}/api`,
  );
}
void bootstrap();
