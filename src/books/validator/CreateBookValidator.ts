import { CreateBookDTO } from '@app/books/dto/BookDTO';
import { Validator } from '@app/common/validator/Validator';
import { logger } from '@app/logger/LoggerFactory';
import joi, { ValidationResult } from 'joi';

export class CreateBookValidator implements Validator<CreateBookDTO> {
  private joiValidator = joi.object<CreateBookDTO, true>({
    title: joi.string().required(),
    description: joi.string().required(),
    genre: joi.string().required(),
  });

  validate(modelObject: CreateBookDTO): ValidationResult {
    logger.debug('create-book-dto.validate');
    return this.joiValidator.validate(modelObject);
  }
}
