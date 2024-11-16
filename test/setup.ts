// test/setup.ts
import { PrismaClient } from '@prisma/client';
import { beforeAll, afterAll } from 'vitest';

const prisma = new PrismaClient();

const testSettings = [
  {
    name: 'Test Ambient',
    value: {
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
      ],
    },
  },
  {
    name: 'Test Dance',
    value: {
      reverb: false,
      play: true,
      release: 2.0,
      octave: 8,
      volume: 0.8,
      wave: 2,
      notes: [
        {
          note: 'e2',
          frequency: 82.41,
          steps: Array(16)
            .fill({ status: false })
            .map((_, i) => ({
              status: [11, 12, 14].includes(i),
            })),
        },
      ],
    },
  },
];

beforeAll(async () => {
  // Clean existing data
  await prisma.setting.deleteMany();

  // Insert test data
  await prisma.setting.createMany({
    data: testSettings,
  });
});

afterAll(async () => {
  // Clean up test data
  await prisma.setting.deleteMany();

  // Disconnect prisma client
  await prisma.$disconnect();
});

// Export for use in tests
export { testSettings };
