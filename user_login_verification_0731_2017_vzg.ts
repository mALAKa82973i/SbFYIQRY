// 代码生成时间: 2025-07-31 20:17:06
import { ApolloServer } from 'apollo-server';
import { gql } from 'apollo-server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserType } from './types';

// Mock database data
const users = [{
  id: '1',
  username: 'testuser',
  password: 'testpassword', // In reality, this should be a hashed password
}];

// Type definitions
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }

  type Query {
    loginUser(username: String!, password: String!): User
  }
`;

// Resolvers
const resolvers = {
  Query: {
    loginUser: async (_, { username, password }) => {
      // Find the user by username
      const user = users.find((u) => u.username === username);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      // Compare the provided password with the hashed password
      const isValid = await bcrypt.compare(password, user.password);
      
      if (!isValid) {
        throw new Error('Invalid password');
      }
      
      // Generate JWT token
      const token = jwt.sign({
        userId: user.id,
      }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });
      
      // Return the user without the password
      return {
        id: user.id,
        username: user.username,
      };
    },
  },
};

// ApolloServer setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    // Context can hold shared data for all resolvers, like the current user or database connection
  })
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

// Documentation
/**
 * User Login Verification System
 * This system allows users to log in and verify their credentials.
 *
 * @param {Object} options - Options for the Apollo Server
 * @returns {void}
 */

// Exporting types for reuse
export { UserType };
