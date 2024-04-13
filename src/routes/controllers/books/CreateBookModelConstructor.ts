import { CreateBookDTO } from '@app/books/dto/BookDTO';
import { ModelConstructor } from '@app/common/ModelConstructor';
import { Request } from 'express';
import { injectable } from 'tsyringe';

@injectable()
export class CreateUserModelConstructor implements ModelConstructor<CreateBookDTO, CreateBookDTO> {
  public constructRawForm(req: Request): CreateBookDTO {
    const createBookDTO = req.body;

    return createBookDTO;
  }

  public constructPureObject(req: Request): CreateBookDTO {
    const updateBookDTO = req.body;

    return updateBookDTO;
  }
}
