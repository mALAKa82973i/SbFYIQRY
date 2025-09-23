// 代码生成时间: 2025-09-24 01:12:32
import { ApolloServer, gql } from 'apollo-server';
import { PrismaClient } from '@prisma/client';

// Define the type for the Query in GraphQL
const typeDefs = gql`
  type Query {
    getUserNameById(userId: Int!): String
  }
`;

// Define the resolver map with proper error handling and input sanitation to prevent SQL injection
const resolvers = {
  Query: {
    getUserNameById: async (_, { userId }, { prisma }) => {
      // Check if userId is a positive integer
      if (!Number.isInteger(userId) || userId <= 0) {
        throw new Error('Invalid user ID.');
      }
      
      try {
        // Use the PrismaClient to query the database safely
        const user = await prisma.user.findUnique({
          where: {
            id: userId
          },
          select: {
            name: true
          }
        });
        
        // Return the user name if found, otherwise throw an error
        if (!user) {
          throw new Error('User not found.');
        }
        return user.name;
      } catch (error) {
        // Log and re-throw the error for further handling
        console.error('Error fetching user name:', error);
        throw new Error('Failed to fetch user name.');
      }
    }
  }
};

// Initialize the PrismaClient
const prisma = new PrismaClient();

// Create and start the ApolloServer with typeDefs and resolvers
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});