import 'reflect-metadata';

import { BooksService } from '@app/books/services/BookService';
import { CreateBookValidator } from '@app/books/validator/CreateBookValidator';
import { DeleteBookValidator } from '@app/books/validator/DeleteBookValidator';
import { UpdateBookValidator } from '@app/books/validator/UpdateBookValidator';
import { verifyAccess } from '@app/common/acs/ACSMiddleware';
import { validate } from '@app/common/validator/ValidationMiddleware';
import { logger } from '@app/logger/LoggerFactory';
import { CreateUserModelConstructor } from '@app/routes/controllers/books/CreateBookModelConstructor';
import { Controller } from '@app/routes/controllers/Controller';
import { Request, Response, Router } from 'express';
import { inject, injectable } from 'tsyringe';

import { DeleteBookModelConstructor } from './DeleteBookModelConstructor';
import { UpdateBookModelConstructor } from './UpdateBookModelConstructor';

@injectable()
export class BooksController implements Controller {
  private readonly createBookModelConstructor = new CreateUserModelConstructor();
  private readonly createBookValidator = new CreateBookValidator();
  private readonly updateBookModelConstructor = new UpdateBookModelConstructor();
  private readonly updateBookValidator = new UpdateBookValidator();
  private readonly deleteBookModelConstructor = new DeleteBookModelConstructor();
  private readonly deleteBookValidator = new DeleteBookValidator();

  constructor(@inject('BooksService') private booksService: BooksService) {}
  public path(): string {
    return '/books';
  }

  public initialize(router: Router): void {
    router.get('/', verifyAccess(), this.getBooks);

    router.post(
      '/',
      validate(this.createBookModelConstructor, this.createBookValidator),
      verifyAccess(),
      this.createBook,
    );

    router.put(
      '/:bookUUID',
      validate(this.updateBookModelConstructor, this.updateBookValidator),
      verifyAccess(),
      this.updateBook,
    );

    router.delete(
      '/:bookUUID',
      validate(this.deleteBookModelConstructor, this.deleteBookValidator),
      verifyAccess(),
      this.deleteBook,
    );
  }

  public createBook = async (req: Request, res: Response): Promise<void> => {
    logger.debug('books.controller.book-create.start');

    const createBookData = this.createBookModelConstructor.constructPureObject(req);

    await this.booksService.createBook(createBookData);

    logger.debug('books.controller.book-create.end');
    res.status(200).json({
      message: 'resource created successfully',
    });
  };

  public updateBook = async (req: Request, res: Response): Promise<void> => {
    logger.debug('profile.controller.update-book.start');
    const { bookUUID, updateBookData } = this.updateBookModelConstructor.constructPureObject(req);

    await this.booksService.updateBook(bookUUID, updateBookData);
    logger.debug('profile.controller.update-book.start');
    res.status(200).json({
      message: 'resource updated successfully',
    });
  };

  public getBooks = async (req: Request, res: Response): Promise<void> => {
    const books = await this.booksService.getBooks();

    res.json({
      books,
    });
  };

  public deleteBook = async (req: Request, res: Response): Promise<void> => {
    logger.debug('book.controller.delete-book.start');
    const { bookUUID } = this.deleteBookModelConstructor.constructPureObject(req);

    await this.booksService.deleteBook(bookUUID);
    logger.debug('book.controller.delete-book.start');
    res.status(200).json({
      message: 'resource deleted successfully',
    });
  };
}
