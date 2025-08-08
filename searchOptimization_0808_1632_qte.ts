// 代码生成时间: 2025-08-08 16:32:08
import { ApolloServer } from 'apollo-server';
import { gql } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';

// Define your data sources and resolvers here.

// Sample data for the search.
const searchData = [
  { id: '1', name: 'Alice', age: 23 },
  { id: '2', name: 'Bob', age: 30 },
  { id: '3', name: 'Charlie', age: 29 },
  // Add more sample data as needed.
];

// Type definitions for GraphQL.
const typeDefs = gql"""
  type Query {
    searchPerson(name: String!): [Person]
  }

  type Person {
    id: String
    name: String
    age: Int
  }
""";

// Resolver map.
const resolvers = {
  Query: {
    // Handles the search query by name.
    searchPerson: async (_, { name }) => {
      // Filter the search data based on the provided name.
      const result = searchData.filter(person => person.name === name);
      // Handle the case where no results are found.
      if (result.length === 0) {
        throw new Error('No person found with the given name.');
      }
      // Return the filtered results.
      return result;
    },
  },
};

// Create an executable schema.
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Set up ApolloServer with the schema.
const server = new ApolloServer({
  schema,
  context: () => ({
    // Add any required context information here.
  })
});

// Start the server.
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
