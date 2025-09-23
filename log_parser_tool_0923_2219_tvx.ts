// 代码生成时间: 2025-09-23 22:19:36
import { ApolloServer, gql } from 'apollo-server';
import fs from 'fs';
import path from 'path';
import { Parser } from 'json2csv';

// Define the GraphQL schema
const typeDefs = gql`
  type Query {
    parseLogFile(
      filePath: String!,
      delimiter: String,
      fields: [String!]!
    ): ParsedLogData
  }

  type ParsedLogData {
    data: [LogEntry]
  }

  type LogEntry {
    """Log entry fields"""
    [key: String]: String
  }
`;

// Define the resolvers for the GraphQL schema
const resolvers = {
  Query: {
    parseLogFile: async (_, { filePath, delimiter, fields }) => {
      // Validate file path
      if (!filePath) {
        throw new Error('File path is required');
      }

      // Check if the file exists
      const fullPath = path.resolve(filePath);
      if (!fs.existsSync(fullPath)) {
        throw new Error('File not found');
      }

      // Read the file content
      const data = fs.readFileSync(fullPath, 'utf8');

      // Split the file content by the delimiter and parse each line
      const lines = data.split('\
');
      const parsedData: LogEntry[] = [];

      for (const line of lines) {
        const logEntry: LogEntry = {};
        const values = line.split(delimiter);

        for (let i = 0; i < fields.length; i++) {
          logEntry[fields[i]] = values[i];
        }

        parsedData.push(logEntry);
      }

      return { data: parsedData };
    },
  },
};

// Create an instance of ApolloServer with the schema and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    // Add any additional context if needed
  })},
);

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

/**
 * Helper function to convert a log entry to a CSV format
 * @param logEntry Log entry to convert to CSV
 * @returns CSV string representation of the log entry
 */
function logEntryToCsv(logEntry: LogEntry): string {
  // Use the json2csv library to convert the log entry to CSV
  const parser = new Parser();
  return parser.parse([logEntry]);
}

/**
 * Helper function to write the CSV data to a file
 * @param csvData CSV data to write
 * @param outputPath Path to the output file
 */
function writeCsvToFile(csvData: string, outputPath: string): void {
  fs.writeFileSync(outputPath, csvData);
}

// Export the helper functions for external use
export { logEntryToCsv, writeCsvToFile };