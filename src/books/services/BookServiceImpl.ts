import { BooksDAO } from '@app/books/db/BooksDAO';
import { BooksService } from '@app/books/services/BookService';
import { TrxUtility } from '@app/db/TrxUtility';
import { ApplicationError } from '@app/error/ApplicationError';
import { logger } from '@app/logger/LoggerFactory';
import { Book, PrismaClient } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { CreateBookDTO, UpdateBookDTO } from '../dto/BookDTO';

@injectable()
export class BooksServiceImpl implements BooksService {
  constructor(
    @inject('PrismaClient') private db: PrismaClient,
    @inject('BooksDAO') private dao: BooksDAO,
  ) {}
  async createBook(book: CreateBookDTO): Promise<void> {
    logger.debug('book.service.create-book.start');

    return TrxUtility.transactional(this.db, async (trx) => {
      const isBookExists = !!(await this.dao.getBookByTitle(trx, book.title));

      if (isBookExists) {
        throw new ApplicationError('Book with such title is already existed', 400);
      }

      await this.dao.createBook(trx, book);
      logger.debug('book.service.create-book.end');
    });
  }

  public async getBooks(): Promise<Array<Book>> {
    logger.debug('book.service.get-books.start');
    return TrxUtility.transactional<Array<Book>>(this.db, async (trx) => {
      const employees = await this.dao.getBooks(trx);

      logger.debug('book.service.get-books.end');
      return employees;
    });
  }

  public async updateBook(uuid: string, updateData: UpdateBookDTO): Promise<void> {
    logger.debug(`book.service.update-book.start.for-uid: [${uuid}]`);

    return TrxUtility.transactional<void>(this.db, async (trx) => {
      const isBookUUIDExists = !!(await this.dao.getBookByUUID(trx, uuid));

      if (!isBookUUIDExists) return;
      if (updateData.title) {
        const isBookTitleExist = !!(await this.dao.getBookByTitle(trx, updateData.title));

        if (isBookTitleExist) return;
      }
      await this.dao.updateBook(trx, uuid, updateData);

      logger.debug(`book.service.update-book.start.for-uid: [${uuid}]`);
    });
  }

  public async deleteBook(uuid: string): Promise<void> {
    logger.debug(`book.service.delete-book.start.for-uid: [${uuid}]`);

    return TrxUtility.transactional<void>(this.db, async (trx) => {
      const isBookExists = !!(await this.dao.getBookByUUID(trx, uuid));

      if (isBookExists) {
        await this.dao.deleteBook(trx, uuid);
      }

      logger.debug(`book.service.delete-book.start.for-uid: [${uuid}]`);
    });
  }
}
