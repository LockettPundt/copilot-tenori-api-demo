import { expect, describe, it, vi, beforeEach } from 'vitest';
import { resolvers } from '../src/resolvers';
import { PrismaClient } from '@prisma/client';

const mockPrisma = {
  setting: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
} as unknown as PrismaClient;

describe('Setting Resolvers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Queries', () => {
    it('Given a setting exists in the database When querying by id Then returns the setting', async () => {
      const mockSetting = {
        id: 1,
        name: 'Test Setting 1',
        value: { reverb: true },
      };
      mockPrisma.setting.findUnique.mockResolvedValue(mockSetting);

      const result = await resolvers.Query.getSetting(
        null,
        { id: 1 },
        { prisma: mockPrisma }
      );

      expect(mockPrisma.setting.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockSetting);
    });

    it('Given settings exist in the database When querying all settings Then returns array of settings', async () => {
      const mockSettings = [
        { id: 1, name: 'Test Setting 1', value: { reverb: true } },
        { id: 2, name: 'Test Setting 2', value: { reverb: false } },
      ];
      mockPrisma.setting.findMany.mockResolvedValue(mockSettings);

      const result = await resolvers.Query.getAllSettings(null, null, {
        prisma: mockPrisma,
      });

      expect(mockPrisma.setting.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockSettings);
    });
  });

  describe('Mutations', () => {
    it('Given valid setting data When creating a new setting Then creates and returns the setting', async () => {
      const newSetting = { name: 'New Setting', value: { reverb: true } };
      const mockCreated = { id: 1, ...newSetting };
      mockPrisma.setting.create.mockResolvedValue(mockCreated);

      const result = await resolvers.Mutation.createSetting(null, newSetting, {
        prisma: mockPrisma,
      });

      expect(mockPrisma.setting.create).toHaveBeenCalledWith({
        data: newSetting,
      });
      expect(result).toEqual(mockCreated);
    });

    it('Given an existing setting When updating its properties Then updates and returns the setting', async () => {
      const updateData = {
        id: 1,
        name: 'Updated Setting',
        value: { reverb: false },
      };
      mockPrisma.setting.update.mockResolvedValue({ ...updateData });

      const result = await resolvers.Mutation.updateSetting(null, updateData, {
        prisma: mockPrisma,
      });

      expect(mockPrisma.setting.update).toHaveBeenCalledWith({
        where: { id: updateData.id },
        data: { name: updateData.name, value: updateData.value },
      });
      expect(result).toEqual(updateData);
    });
  });
});
