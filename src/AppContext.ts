import { AuthModule } from '@app/auth/AuthModule';
import { BooksModule } from '@app/books/BooksModule';
import { logger } from '@app/logger/LoggerFactory';
import { LoggerModule } from '@app/logger/LoggerModule';
import { RouterModule } from '@app/routes/RouterModule';

import { DatabaseModule } from './db/DatabaseModule';

export class AppContext {
  static async initialize(): Promise<void> {
    await DatabaseModule.initialize();
    await LoggerModule.initialize();
    await BooksModule.initialize();
    await AuthModule.initialize();
    await RouterModule.initialize();

    logger.info('app.context.initialized');
  }
}
