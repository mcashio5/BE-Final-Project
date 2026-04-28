import 'dotenv/config';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Password123!', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: { email: 'admin@example.com', name: 'Admin User', passwordHash, role: 'ADMIN' },
  });

  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: { email: 'user@example.com', name: 'Regular User', passwordHash, role: 'USER' },
  });

  const otherUser = await prisma.user.upsert({
    where: { email: 'other@example.com' },
    update: {},
    create: { email: 'other@example.com', name: 'Other User', passwordHash, role: 'USER' },
  });

  const book1 = await prisma.book.upsert({
    where: { isbn: '9780547928227' },
    update: {},
    create: {
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      isbn: '9780547928227',
      genre: 'Fantasy',
      description: 'A fantasy adventure novel.',
      available: true,
    },
  });

  const book2 = await prisma.book.upsert({
    where: { isbn: '9780132350884' },
    update: {},
    create: {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      isbn: '9780132350884',
      genre: 'Programming',
      description: 'A book about writing readable code.',
      available: false,
    },
  });

  const book3 = await prisma.book.upsert({
    where: { isbn: '9780061120084' },
    update: {},
    create: {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      isbn: '9780061120084',
      genre: 'Classic',
      description: 'A classic novel about justice and morality.',
      available: true,
    },
  });

  const existingReview = await prisma.review.findFirst({ where: { userId: user.id, bookId: book1.id } });
  if (!existingReview) {
    await prisma.review.create({ data: { userId: user.id, bookId: book1.id, rating: 5, comment: 'Great book for the library.' } });
  }

  const otherReview = await prisma.review.findFirst({ where: { userId: otherUser.id, bookId: book2.id } });
  if (!otherReview) {
    await prisma.review.create({ data: { userId: otherUser.id, bookId: book2.id, rating: 4, comment: 'Very helpful programming book.' } });
  }

  const existingLoan = await prisma.loan.findFirst({ where: { userId: user.id, bookId: book2.id, status: 'ACTIVE' } });
  if (!existingLoan) {
    await prisma.loan.create({
      data: {
        userId: user.id,
        bookId: book2.id,
        status: 'ACTIVE',
        dueDate: new Date('2026-05-15T00:00:00.000Z'),
      },
    });
  }

  console.log('Seed complete');
  console.log('Admin login: admin@example.com / Password123!');
  console.log('User login: user@example.com / Password123!');
  console.log('Other login: other@example.com / Password123!');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
