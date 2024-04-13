import { Book } from '@prisma/client';
export type CreateBookDTO = Omit<Book, 'id'>;
export type UpdateBookDTO = Partial<CreateBookDTO>;

export type CreateBookResponseDTO = Book;
