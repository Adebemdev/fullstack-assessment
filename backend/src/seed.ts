import bcrypt from 'bcryptjs';
import { prisma } from './prisma/prisma';

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
    },
  });

  await prisma.user.upsert({
    where: { email: 'staff@example.com' },
    update: {},
    create: {
      name: 'Staff User',
      email: 'staff@example.com',
      password: hashedPassword,
      role: 'staff',
    },
  });

  console.log('Seed complete!');
}

main()
  .catch(e => console.error(e))
  .finally(() => process.exit());
