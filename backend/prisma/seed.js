import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const municipalities = [
  'Angono',
  'Antipolo',
  'Baras',
  'Binangonan',
  'Cainta',
  'Cardona',
  'Jalajala',
  'Morong',
  'Pililla',
  'Rodriguez',
  'San Mateo',
  'Tanay',
  'Taytay',
  'Teresa',
];

async function main() {
  console.log('Starting municipality seeding...\n');

  for (const name of municipalities) {
    const municipality = await prisma.municipality.upsert({
      where: { name },
      update: {},          // No fields to update — name is unique and immutable
      create: { name },
    });

    console.log(`  Upserted: ${municipality.name} (id: ${municipality.id})`);
  }

  console.log(`\n Seeding complete. ${municipalities.length} municipalities processed.`);
}

main()
  .catch((error) => {
    console.error(' Seeding failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log(' Prisma client disconnected.');
  });
