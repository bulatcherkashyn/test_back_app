import 'express-async-errors';

import { resolve } from 'node:path';

import { finalErrorHandler } from '@app/common/express/ErrorHandler';
import { LoggerFactory } from '@app/logger/LoggerFactory';
import { Router } from '@app/routes/Router';
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

export class App {
  private static setupContentTypePolicy(req: Request, res: Response, next: NextFunction): void {
    res.header('Content-Type', 'application/json;charset=utf-8');
    res.header('Accept', 'application/json;charset=utf-8');
    next();
  }

  private readonly express: Application;

  constructor() {
    this.express = express();

    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeFinalErrorHandler();
  }

  private initializeMiddleware(): void {
    this.express.use(
      cors({
        origin: '*',
        methods: ['PUT', 'POST', 'GET', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'Authorization'],
        exposedHeaders: ['Authorization', 'Content-Type'],
      }),
    );

    const swaggerSchemaPath = resolve('schema.yml');
    const swaggerDocument = YAML.load(swaggerSchemaPath);

    this.express.use('/api-docs', swaggerUi.serve);
    this.express.get('/api-docs', swaggerUi.setup(swaggerDocument));

    this.express.use(App.setupContentTypePolicy);
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(LoggerFactory.getExpressLogger());
  }
  private initializeRoutes(): void {
    const router = new Router();

    router.mountRoutes(this.express);
  }

  private initializeFinalErrorHandler(): void {
    this.express.use(finalErrorHandler);
  }

  get application(): express.Application {
    return this.express;
  }
}
