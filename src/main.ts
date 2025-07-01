import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api")
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))

  const config = new DocumentBuilder()
    .setTitle('Abrorbek')
    .setDescription("Swagger")
    .addBearerAuth()
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);


  await app.listen(process.env.PORT ?? 5000);
  console.log(`http://localhost:${process.env.PORT || 5000}/swagger`);

}
bootstrap();

