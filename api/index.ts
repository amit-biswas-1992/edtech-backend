import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module.js';
import { globalValidationPipe } from '../src/common/pipes/validation.pipe.js';
import { AllExceptionsFilter } from '../src/common/filters/all-exceptions.filter.js';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();
let app: any;

async function createApp() {
  if (!app) {
    try {
      const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(server), {
        logger: ['error', 'warn', 'log'],
      });

      nestApp.enableCors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        credentials: true,
      });

      nestApp.useGlobalPipes(globalValidationPipe);
      nestApp.useGlobalFilters(new AllExceptionsFilter());

      // Health check
      const expressApp = nestApp.getHttpAdapter().getInstance();
      expressApp.get('/health', (_req: any, healthRes: any) => {
        healthRes.json({
          status: 'ok',
          env: {
            hasJwtSecret: !!process.env.JWT_SECRET,
            jwtSecretLength: process.env.JWT_SECRET?.length || 0,
            hasDbUrl: !!process.env.DATABASE_URL,
          },
        });
      });

      await nestApp.init();
      app = nestApp;
    } catch (error: any) {
      console.error('NestJS Bootstrap Error:', error?.message, error?.stack);
      throw error;
    }
  }
  return server;
}

export default async function handler(req: any, res: any) {
  try {
    const app = await createApp();
    app(req, res);
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Bootstrap failed' });
  }
}
