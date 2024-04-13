import { DeleteBookForm } from '@app/books/models/Book';
import { ModelConstructor } from '@app/common/ModelConstructor';
import { Request } from 'express';
import { injectable } from 'tsyringe';

@injectable()
export class DeleteBookModelConstructor
  implements ModelConstructor<DeleteBookForm, DeleteBookForm>
{
  public constructRawForm(req: Request): DeleteBookForm {
    const { bookUUID } = req.params;

    return {
      bookUUID,
    };
  }

  public constructPureObject(req: Request): DeleteBookForm {
    const { bookUUID } = req.params;

    return {
      bookUUID,
    };
  }
}
