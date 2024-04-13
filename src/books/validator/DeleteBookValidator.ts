import { DeleteBookForm } from '@app/books/models/Book';
import { Validator } from '@app/common/validator/Validator';
import { logger } from '@app/logger/LoggerFactory';
import joi, { ValidationResult } from 'joi';

export class DeleteBookValidator implements Validator<DeleteBookForm> {
  private joiValidator = joi.object<DeleteBookForm, true>({
    bookUUID: joi.string().required(),
  });

  validate(modelObject: DeleteBookForm): ValidationResult {
    logger.debug('delete-book-dto.validate');
    return this.joiValidator.validate(modelObject);
  }
}
