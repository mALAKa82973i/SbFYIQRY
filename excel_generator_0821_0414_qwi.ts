// 代码生成时间: 2025-08-21 04:14:12
import * as ExcelJS from 'exceljs';
import { ApolloServer } from 'apollo-server';
import { gql } from 'apollo-server-express';
import express from 'express';
import fs from 'fs';
import path from 'path';

// Define the schema for the GraphQL API
const typeDefs = gql`
  type Query {
    "Generate an Excel file"
    generateExcel(data: [Data]): String
  }
  type Data {
    "Data fields"
    field1: String
    field2: String
  }
`;

// Define the resolvers for the GraphQL API
const resolvers = {
  Query: {
    generateExcel: async (_, { data }) => {
      try {
        // Create a new Excel workbook
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Generated Data');

        // Add data to the worksheet
        for (const item of data) {
          worksheet.addRow({
            field1: item.field1,
            field2: item.field2
          });
        }

        // Save the workbook as an Excel file
        const filename = 'generated_excel.xlsx';
        const filePath = path.join(__dirname, filename);
        await workbook.xlsx.writeFile(filePath);

        return `Excel file generated at ${filePath}`;
      } catch (error) {
        console.error('Error generating Excel file:', error);
        throw new Error('Failed to generate Excel file');
      }
    }
  }
};

// Create an Express app
const app = express();

// Create an ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    // Provide additional context if needed
  })
});

// Apply the GraphQL middleware to the Express app
server.applyMiddleware({ app });

// Listen on a port for incoming requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
});