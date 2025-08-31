// 代码生成时间: 2025-08-31 11:30:46
import { ApolloServer } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/subgraph';

// Define a type for the stock item
interface StockItem {
  id: string;
  name: string;
  quantity: number;
}

// Mock database for stock items
const stockDatabase: StockItem[] = [];

// Resolvers for CRUD operations
const resolvers = {
  Query: {
    // Retrieve a stock item by id
    stockItem: (_: any, { id }: { id: string }) => {
      const item = stockDatabase.find(item => item.id === id);
      if (!item) {
        throw new Error('Stock item not found.');
      }
      return item;
    },
    // Retrieve all stock items
    stockItems: () => stockDatabase,
  },
  Mutation: {
    // Add a new stock item
    addStockItem: (_: any, { stockItem }: { stockItem: { name: string; quantity: number } }) => {
      const newItem: StockItem = {
        id: Date.now().toString(),
        name: stockItem.name,
        quantity: stockItem.quantity,
      };
      stockDatabase.push(newItem);
      return newItem;
    },
    // Update an existing stock item
    updateStockItem: (_: any, { id, stockItem }: { id: string; stockItem: { quantity: number } }) => {
      const itemIndex = stockDatabase.findIndex(item => item.id === id);
      if (itemIndex === -1) {
        throw new Error('Stock item not found.');
      }
      stockDatabase[itemIndex] = {
        ...stockDatabase[itemIndex],
        quantity: stockItem.quantity,
      };
      return stockDatabase[itemIndex];
    },
    // Delete a stock item
    deleteStockItem: (_: any, { id }: { id: string }) => {
      const itemIndex = stockDatabase.findIndex(item => item.id === id);
      if (itemIndex === -1) {
        throw new Error('Stock item not found.');
      }
      const itemToDelete = stockDatabase[itemIndex];
      stockDatabase.splice(itemIndex, 1);
      return itemToDelete;
    },
  },
};

// Construct a schema, using GraphQL schema language
const typeDefs = gql"""
  type StockItem {
    id: ID!
    name: String!
    quantity: Int!
  }

  type Query {
    stockItem(id: ID!): StockItem
    stockItems: [StockItem]
  }

  type Mutation {
    addStockItem(stockItem: StockItemInput): StockItem
    updateStockItem(id: ID!, stockItem: StockItemInput): StockItem
    deleteStockItem(id: ID!): StockItem
  }

  input StockItemInput {
    name: String
    quantity: Int
  }
""";

// Create an Apollo Server with the schema and resolvers
const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs,
    resolvers,
  })},
);

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
