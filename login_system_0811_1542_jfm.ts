// 代码生成时间: 2025-08-11 15:42:39
 * It includes error handling, documentation, and follows best practices for maintainability and scalability.
 */

import { ApolloServer, gql } from 'apollo-server';
import { AuthenticationError } from 'apollo-server-errors';

// Define a User type
interface User {
  id: string;
  username: string;
  password: string;
}

// Mock database of users
const users: User[] = [
  { id: '1', username: 'john', password: 'john123' },
  { id: '2', username: 'jane', password: 'jane123' },
];

// Type definitions for GraphQL
const typeDefs = gql`
  type Query {
    login(username: String!, password: String!): User
  }
  type User {
    id: String
    username: String
  }
`;

// Resolvers for GraphQL
const resolvers = {
  Query: {
    login: async (_, { username, password }) => {
      // Check if the username and password are provided
      if (!username || !password) {
        throw new AuthenticationError('Username and password are required');
      }

      // Find the user in the mock database
      const user = users.find(u => u.username === username && u.password === password);

      // If user is not found, throw an error
      if (!user) {
        throw new AuthenticationError('Invalid username or password');
      }

      // Return the user object (excluding sensitive info)
      return {
        id: user.id,
        username: user.username,
      };
    },
  },
};

// Create an Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Enable playground for development purposes
  context: () => ({
    headers: { 'Content-Type': 'application/json' },
  }),
  formatError: (error) => ({
    message: error.message,
    locations: error.locations,
    path: error.path,
  }),
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});