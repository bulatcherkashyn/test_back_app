import 'process';

import { PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient({
  errorFormat: 'minimal',
});

(async (): Promise<void> => {
  await prisma.$transaction(async (tx) => {
    try {
      await tx.book.deleteMany({});

      await tx.book.create({
        data: {
          title: 'book1',
          description: 'book1 description ...',
          genre: 'western',
        },
      });

      await tx.book.create({
        data: {
          title: 'book2',
          description: 'book2 description ...',
          genre: 'adventure',
        },
      });

      await tx.book.create({
        data: {
          title: 'book3',
          description: 'book3 description ...',
          genre: 'fantasy',
        },
      });
      await tx.book.create({
        data: {
          title: 'book4',
          description: 'book4 description ...',
          genre: 'dystopian',
        },
      });
      await tx.book.create({
        data: {
          title: 'book5',
          description: 'book5 description ...',
          genre: 'adventure',
        },
      });
      await tx.book.create({
        data: {
          title: 'book6',
          description: 'book6 description ...',
          genre: 'dystopian',
        },
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('ERR', err);
    }
  });
})();
