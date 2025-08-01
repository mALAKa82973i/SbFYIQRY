// 代码生成时间: 2025-08-01 08:22:00
import { ApolloServer, gql } from 'apollo-server';
import { randomInt } from 'crypto';

// Define the type for the Query with a random number generation.
const typeDefs = gql`
  type Query {
    generateRandomNumber(min: Int, max: Int): Int
  }
`;

// Resolvers for the random number generator, responsible for generating a random number.
const resolvers = {
  Query: {
    generateRandomNumber: async (_, { min, max }) => {
      if (min > max) {
        throw new Error('Minimum value cannot be greater than maximum value.');
      }
      return randomInt(0, max - min + 1) + min;
    },
  },
};

// Create an instance of ApolloServer.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the ApolloServer.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

/*
 * This program creates an ApolloServer instance and defines a GraphQL endpoint that
 * can be used to generate random numbers within a specified range. The server
 * listens on a port and logs the URL to the console once ready.
 *
 * To use this program, you would make a GraphQL query to the /generateRandomNumber
 * endpoint, passing in the minimum and maximum values for the random number.
 *
 * Example query:
 * mutation {
 *   generateRandomNumber(min: 1, max: 10)
 * }
 *
 * This would return a random integer between 1 and 10.
 */