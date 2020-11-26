import { gql } from "apollo-server-express";

export default gql`
  type Submission {
    id: ID!
    code: String!
    codeKey: String!
    author: User!
    created: String!
    status: Int
    finished: Boolean
  }

  extend type Query {
    submission(id: ID!): Submission
    submissions: [Submission!]!
  }

  extend type Mutation {
    addSubmission(code: String!, posterId: ID!): Submission
    checkSubmission(id: ID!): Submission
  }
`;
