import { BooksDAOImpl } from '@app/books/db/BooksDAOImpl';
import { BooksServiceImpl } from '@app/books/services/BookServiceImpl';
import { logger } from '@app/logger/LoggerFactory';
import { container } from 'tsyringe';

export class BooksModule {
  static async initialize(): Promise<void> {
    container.registerSingleton('BooksDAO', BooksDAOImpl);
    container.registerSingleton('BooksService', BooksServiceImpl);
    logger.debug('app.books.module.initialized');
  }
}
