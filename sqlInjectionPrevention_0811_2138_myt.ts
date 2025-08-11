// 代码生成时间: 2025-08-11 21:38:10
import { ApolloServer, gql, UserInputError } from 'apollo-server';
import { createConnection } from 'typeorm';
import { User } from './entity/User'; // Assuming you have a User entity

// Define the GraphQL type definitions
const typeDefs = gql`
  type Query {
    """
    Retrieve users by a search term.
    """
    getUsersBySearch(searchTerm: String!): [User]
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }
`;

// Define the resolvers
const resolvers = {
  Query: {
    getUsersBySearch: async (_, { searchTerm }) => {
      try {
        // Use parameterized queries to prevent SQL injection
        const users = await User.find({
          where: {
            name: Like(`%${searchTerm}%`), // 'Like' and parameterized query prevent SQL injection
          },
        });

        return users;
      } catch (error) {
        // Handle any errors that occur during the database query
        console.error('Error fetching users by search term:', error);
        throw new UserInputError('Failed to fetch users', {
          errors: error,
        });
      }
    },
  },
};

// Initialize the database connection
async function startApolloServer() {
  try {
    await createConnection({
      type: 'postgres',
      database: 'your_database',
      entities: [User],
      synchronize: true,
    });

    // Create an Apollo Server instance
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    // Start the server
    const { url } = await server.listen({
      port: 4000, // You can choose any available port
    });
    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.error('Failed to start Apollo Server:', error);
  }
}

// Start the server
startApolloServer();