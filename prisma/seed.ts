// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const exampleValue = {
  reverb: true,
  play: false,
  release: 1.5,
  octave: 9,
  volume: 0.6,
  wave: 3,
  notes: [
    {
      note: 'c2',
      frequency: 65.41,
      steps: Array(16).fill({ status: false }),
    },
    {
      note: 'e2',
      frequency: 82.41,
      steps: Array(16)
        .fill({ status: false })
        .map((_, i) => ({
          status: [11, 12, 14].includes(i),
        })),
    },
    {
      note: 'g2',
      frequency: 98.0,
      steps: Array(16)
        .fill({ status: false })
        .map((_, i) => ({
          status: [0, 7, 14].includes(i),
        })),
    },
  ],
};

async function main() {
  await prisma.setting.createMany({
    data: [
      {
        name: 'Ambient Melody',
        value: exampleValue,
      },
      {
        name: 'Dance Beat',
        value: {
          ...exampleValue,
          reverb: false,
          release: 2.0,
          octave: 8,
          volume: 0.8,
          wave: 2,
        },
      },
      {
        name: 'Chill Vibes',
        value: {
          ...exampleValue,
          play: true,
          release: 1.8,
          volume: 0.7,
          wave: 1,
        },
      },
    ],
  });

  console.log('Seed data inserted successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
