import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar JSON
  scalar DateTime

  type Setting {
    id: Int!
    name: String!
    value: JSON!
    created_at: DateTime!
    updated_at: DateTime!
  }

  type Query {
    getSetting(id: Int!): Setting
    getRandomSetting: Setting
    getAllSettings: [Setting!]!
  }

  type Mutation {
    createSetting(name: String!, value: JSON!): Setting!
    updateSetting(id: Int!, name: String, value: JSON): Setting!
  }
`;
