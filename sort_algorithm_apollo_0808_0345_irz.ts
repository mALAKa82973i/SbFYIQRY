// 代码生成时间: 2025-08-08 03:45:01
import { ApolloServer, gql } from 'apollo-server';

// Define the type for sorting input
interface SortInput {
  array: number[];
  algorithm: string;
}

// Define the type for the response
interface SortResponse {
  sortedArray: number[];
  error?: string;
}

// Define the sort algorithms
const sortAlgorithms = {
  'bubbleSort': (arr: number[]): number[] => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          // Swap the elements
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  },
  'quickSort': (arr: number[]): number[] => {
    if (arr.length <= 1) {
      return arr;
    }
    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
  },
  // Add more sorting algorithms as needed
};

// Define the Resolvers
const resolvers = {
  Query: {
    sort: (_: any, { array, algorithm }: SortInput): SortResponse => {
      try {
        // Validate the input
        if (!algorithm || !array || !sortAlgorithms[algorithm]) {
          throw new Error('Invalid input for sorting algorithm.');
        }
        // Perform the sort
        const sortedArray = sortAlgorithms[algorithm](array);
        return { sortedArray };
      } catch (error) {
        return { error: error.message };
      }
    },
  },
};

// Define the type definitions for the Apollo Server
const typeDefs = gql`
  type SortResponse {
    sortedArray: [Float]
    error: String
  }

  input SortInput {
    array: [Float]!
    algorithm: String!
  }

  type Query {
    sort(input: SortInput!): SortResponse!
  }
`;

// Create the Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Other options, like context, can be added here
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});