import { CreateBookDTO, CreateBookResponseDTO, UpdateBookDTO } from '@app/books/dto/BookDTO';

export interface BooksService {
  createBook(user: CreateBookDTO): Promise<void>;
  getBooks(): Promise<Array<CreateBookResponseDTO>>;
  updateBook(uid: string, updateData: UpdateBookDTO): Promise<void>;
  deleteBook(uuid: string): Promise<void>;
}
