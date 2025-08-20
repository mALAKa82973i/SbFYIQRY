// 代码生成时间: 2025-08-20 14:58:14
import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

// Define the port number for the server
const PORT = process.env.PORT || 4000;

// Define the main function to initialize the Apollo server
async function main() {
  try {
    // Create a new instance of ApolloServer with type definitions and resolvers
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    // Start the server
    await server.listen(PORT);
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  } catch (error) {
    // Handle any errors that may occur during server initialization
    console.error('Server failed to start:', error);
  }
}

// Call the main function to initiate the server
main();

// Export the server instance for testing purposes
export { main };
