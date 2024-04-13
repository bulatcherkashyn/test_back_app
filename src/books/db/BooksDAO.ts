import { TrxClient } from '@app/db/TrxClient';
import { Book } from '@prisma/client';

import { CreateBookDTO, UpdateBookDTO } from '../dto/BookDTO';

export interface BooksDAO {
  createBook(trx: TrxClient, book: CreateBookDTO): Promise<Book>;
  getBooks(trx: TrxClient): Promise<Array<Book>>;
  getBookByTitle(trx: TrxClient, title: string): Promise<Book | null>;
  getBookByUUID(trx: TrxClient, uuid: string): Promise<Book | null>;
  updateBook(trx: TrxClient, uid: string, updateData: UpdateBookDTO): Promise<void>;
  deleteBook(trx: TrxClient, uid: string): Promise<void>;
}
