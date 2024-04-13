import { UpdateBookDTO } from '@app/books/dto/BookDTO';
import { UpdateBookForm } from '@app/books/models/Book';
import { Validator } from '@app/common/validator/Validator';
import { logger } from '@app/logger/LoggerFactory';
import joi, { ValidationResult } from 'joi';

export class UpdateBookValidator implements Validator<UpdateBookForm> {
  private joiValidator = joi.object<UpdateBookForm, true>({
    bookUUID: joi.string().required(),
    updateBookData: joi.object<UpdateBookDTO, true>({
      title: joi.string().optional(),
      description: joi.string().optional(),
      genre: joi.string().optional(),
    }),
  });

  validate(modelObject: UpdateBookForm): ValidationResult {
    logger.debug('update-book-dto.validate');
    return this.joiValidator.validate(modelObject);
  }
}
