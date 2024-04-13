import { logger } from '@app/logger/LoggerFactory';
import { AuthController } from '@app/routes/controllers/auth/AuthController';
import { BooksController } from '@app/routes/controllers/books/BooksController';
import { container } from 'tsyringe';

export class RouterModule {
  static async initialize(): Promise<void> {
    container.registerSingleton('BooksController', BooksController);
    container.registerSingleton('AuthController', AuthController);

    logger.debug('app.context.router.module.initialized');
  }
}
