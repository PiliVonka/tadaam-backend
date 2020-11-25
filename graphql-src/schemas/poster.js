import { gql } from "apollo-server-express";

export default gql`
  type Poster {
    id: ID!
    title: String!
    description: String!
    author: User!
    created: String!
    stdin: String!
    stdout: String!
  }

  extend type Query {
    poster(id: ID!): Poster
    posters: [Poster!]!
  }

  extend type Mutation {
    addPoster(title: String!, description: String!, stdin: String!, stdout: String!): Poster @auth
  }
`;
