/* eslint-disable no-console */
import { CreateBookDTO, UpdateBookDTO } from '@app/books/dto/BookDTO';
import { TrxClient } from '@app/db/TrxClient';
import { logger } from '@app/logger/LoggerFactory';
import { Book } from '@prisma/client';
import { injectable } from 'tsyringe';

import { BooksDAO } from './BooksDAO';

@injectable()
export class BooksDAOImpl implements BooksDAO {
  public async updateBook(trx: TrxClient, uid: string, updateData: UpdateBookDTO): Promise<void> {
    logger.debug('books.dao.update-by-uid-start');
    await trx.book.update({
      where: {
        id: uid,
      },
      data: updateData,
    });
    logger.debug('books.dao.update-by-uid-end');
  }

  public async createBook(trx: TrxClient, book: CreateBookDTO): Promise<Book> {
    logger.debug('books.dao.create-book-start');
    try {
      const createdBook = await trx.book.create({
        data: {
          ...book,
        },
      });

      logger.debug('books.dao.create-book-end');
      return createdBook;
    } catch (e) {
      throw e;
    }
  }

  public async getBooks(trx: TrxClient): Promise<Array<Book>> {
    logger.debug('books.dao.get-books-start');
    try {
      const books = await trx.book.findMany({});

      logger.debug('books.dao.get-books-end');
      return books;
    } catch (e) {
      throw e;
    }
  }

  public async deleteBook(trx: TrxClient, uid: string): Promise<void> {
    logger.debug('books.dao.update-book-start');
    try {
      await trx.book.delete({
        where: {
          id: uid,
        },
      });
      logger.debug('books.dao.update-book-end');
    } catch (e) {
      throw e;
    }
  }

  public async getBookByTitle(trx: TrxClient, title: string): Promise<Book | null> {
    const book = await trx.book.findUnique({
      where: {
        title,
      },
    });

    return book;
  }

  public async getBookByUUID(trx: TrxClient, uuid: string): Promise<Book | null> {
    const book = await trx.book.findUnique({
      where: {
        id: uuid,
      },
    });

    return book;
  }
}
