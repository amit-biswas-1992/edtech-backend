import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module.js';
import { globalValidationPipe } from '../src/common/pipes/validation.pipe.js';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();
let app: any;

async function createApp() {
  if (!app) {
    const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(server));

    nestApp.enableCors({
      origin: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      credentials: true,
    });

    nestApp.useGlobalPipes(globalValidationPipe);

    await nestApp.init();
    app = nestApp;
  }
  return server;
}

export default async function handler(req: any, res: any) {
  const app = await createApp();
  app(req, res);
}
