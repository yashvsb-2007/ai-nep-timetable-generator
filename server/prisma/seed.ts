import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding NEP 2020 Timetable Database...');

  // Hash default password
  const passwordHash = await bcrypt.hash('password123', 10);

  // 1. Create Users
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@university.edu' },
    update: {},
    create: {
      email: 'admin@university.edu',
      passwordHash,
      name: 'Dr. A. K. Sharma',
      role: 'COLLEGE_ADMIN',
      phone: '+91 9876543210'
    }
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
