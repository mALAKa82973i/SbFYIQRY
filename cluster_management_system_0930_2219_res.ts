// 代码生成时间: 2025-09-30 22:19:16
import { ApolloServer } from 'apollo-server';
import { gql } from 'apollo-server';
import { InMemoryLRUCache } from 'apollo-server-caching';
import { buildFederatedSchema } from '@apollo/federation';

// Define the schema for the Cluster Management System
const typeDefs = gql`
  extend type Query {
    "Get all clusters"
    getAllClusters: [Cluster]
    "Get cluster by ID"
    getClusterById(id: ID!): Cluster
  }
  "Represents a cluster"
  type Cluster {
    id: ID!
    name: String!
    nodes: [Node]
  }
  "Represents a node in a cluster"
  type Node {
    id: ID!
    status: String!
  }
`;

// Define the resolvers for the Cluster Management System
const resolvers = {
  Query: {
    getAllClusters: () => {
      // Mock data for demonstration purposes
      return [{
        id: '1',
        name: 'Cluster 1',
        nodes: [{ id: '1', status: 'active' }],
      }, {
        id: '2',
        name: 'Cluster 2',
        nodes: [{ id: '2', status: 'inactive' }],
      }];
    },
    getClusterById: (parent, args) => {
      // Mock data for demonstration purposes
      const clusters = [
        { id: '1', name: 'Cluster 1', nodes: [{ id: '1', status: 'active' }] },
        { id: '2', name: 'Cluster 2', nodes: [{ id: '2', status: 'inactive' }] },
      ];
      const cluster = clusters.find((cluster) => cluster.id === args.id);
      if (!cluster) {
        throw new Error('Cluster not found');
      }
      return cluster;
    },
  },
};

// Create the Apollo Server instance
const server = new ApolloServer({
  schema: buildFederatedSchema([{
    typeDefs,
    resolvers,
  }]),
  cache: new InMemoryLRUCache(),
  context: () => ({
    // Add any context needed for the resolvers
  }),
  // Enable playground for development
  playground: true,
  introspection: true,
  // Error handling middleware
  formatError: (error) => {
    // Log the error and return a user-friendly message
    console.error(error);
    return error.message;
  },
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`Cluster Management System is running at ${url}`);
});