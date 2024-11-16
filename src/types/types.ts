import { PrismaClient } from '@prisma/client';

export interface Setting {
  id: number;
  name: string;
  value: any;
  created_at: Date;
  updated_at: Date;
}

export interface Context {
  prisma: PrismaClient;
}
