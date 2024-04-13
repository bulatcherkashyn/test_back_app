import { CreateBookDTO, UpdateBookDTO } from '@app/books/dto/BookDTO';
import { Book } from '@prisma/client';

export type BookResponse = Book;

export interface CreateBookForm {
  createData: CreateBookDTO;
}

export interface UpdateBookForm {
  bookUUID: string;
  updateBookData: UpdateBookDTO;
}

export interface DeleteBookForm {
  bookUUID: string;
}
