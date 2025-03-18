import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS'u etkinleştirir
  app.enableCors({
    origin: 'http://localhost:3001', // React uygulamanın çalıştığı adres
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  // Express'in JSON body-parser'ını kullanır
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // DTO validation için
  app.useGlobalPipes(new ValidationPipe());

  // Gelen istekleri terminalde görmek için log ekler
  app.use((req, res, next) => {
    console.log(`Gelen İstek: ${req.method} ${req.url}`);
    next();
  });

  await app.listen(3000);
}
bootstrap();
