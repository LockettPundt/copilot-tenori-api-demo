import { Context } from './types/types';
import { GraphQLJSON, GraphQLDateTime } from 'graphql-scalars';

export const resolvers = {
  JSON: GraphQLJSON,
  DateTime: GraphQLDateTime,

  Query: {
    getSetting: (_: any, { id }: { id: number }, { prisma }: Context) => {
      return prisma.setting.findUnique({ where: { id } });
    },
    getRandomSetting: async (_: any, __: any, { prisma }: Context) => {
      const settings = await prisma.setting.findMany();
      return settings[Math.floor(Math.random() * settings.length)];
    },
    getAllSettings: (_: any, __: any, { prisma }: Context) => {
      return prisma.setting.findMany();
    },
  },

  Mutation: {
    createSetting: (
      _: any,
      { name, value }: { name: string; value: any },
      { prisma }: Context
    ) => {
      return prisma.setting.create({
        data: { name, value },
      });
    },
    updateSetting: (
      _: any,
      { id, name, value }: { id: number; name?: string; value?: any },
      { prisma }: Context
    ) => {
      return prisma.setting.update({
        where: { id },
        data: { name, value },
      });
    },
  },
};
