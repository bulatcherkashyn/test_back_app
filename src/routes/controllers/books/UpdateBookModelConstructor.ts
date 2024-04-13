import { UpdateBookForm } from '@app/books/models/Book';
import { ModelConstructor } from '@app/common/ModelConstructor';
import { Request } from 'express';
import { injectable } from 'tsyringe';

@injectable()
export class UpdateBookModelConstructor
  implements ModelConstructor<UpdateBookForm, UpdateBookForm>
{
  public constructRawForm(req: Request): UpdateBookForm {
    const updateBookData = req.body;

    const { bookUUID } = req.params;

    return {
      updateBookData,
      bookUUID,
    };
  }

  public constructPureObject(req: Request): UpdateBookForm {
    const updateBookData = req.body;

    const { bookUUID } = req.params;

    return {
      updateBookData,
      bookUUID,
    };
  }
}
