// 代码生成时间: 2025-10-02 21:20:47
import { ApolloServer, gql } from 'apollo-server';
import { existsSync, readFileSync, readdirSync, statSync } from 'fs';
import { join, sep } from 'path';
import { promisify } from 'util';
import { performance } from 'perf_hooks';

// Async version of readdir using promisify
const readdir = promisify(readdirSync);

// Type Definitions
const typeDefs = gql`
  type File {
# 扩展功能模块
    name: String!
    path: String!
    size: Float!
    isDirectory: Boolean!
  }

  type Query {
# 扩展功能模块
    searchFiles(directory: String!, query: String!): [File]
  }
`;

// Resolvers
const resolvers = {
  Query: {
    searchFiles: async (_, { directory, query }) => {
# 优化算法效率
      try {
        // Check if the directory exists
        if (!existsSync(directory)) {
          throw new Error('Directory does not exist');
        }

        // Helper function to search files
        const searchFilesRecursively = async (dirPath: string, searchQuery: string) => {
          const files = [];
          const currentFiles = await readdir(dirPath);
          for (let file of currentFiles) {
            const filePath = join(dirPath, file);
            // Check if it's a directory or file
# 改进用户体验
            const stats = statSync(filePath);
            if (stats.isDirectory()) {
# 添加错误处理
              // Recurse into the directory
              files.push(...(await searchFilesRecursively(filePath + sep, searchQuery)));
# 扩展功能模块
            } else if (file.includes(searchQuery)) {
              // If it's a file, check if it matches the query
              const fileStats = statSync(filePath);
              files.push({
                name: file,
                path: filePath,
                size: fileStats.size,
                isDirectory: false
              });
            }
          }
          return files;
        };

        // Start the search with a performance measurement
        const start = performance.now();
        const results = await searchFilesRecursively(directory, query);
        const end = performance.now();

        console.log(`Search completed in ${end - start} milliseconds`);

        return results;
      } catch (error) {
        console.error('An error occurred:', error);
# 添加错误处理
        throw new Error(error.message);
      }
    }
  }
};

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {},
  playground: true,
  introspection: true,
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
