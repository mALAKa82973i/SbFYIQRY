// 代码生成时间: 2025-09-08 08:24:36
import { ApolloServer, gql } from 'apollo-server';

// Enum to define the type of sorting algorithm to use
enum SortingAlgorithmType {
  BUBBLE_SORT = 'BUBBLE_SORT',
  SELECTION_SORT = 'SELECTION_SORT',
  INSERTION_SORT = 'INSERTION_SORT'
}

// Interface for sorting service
interface SortingService {
  sort: (array: number[], algorithm: SortingAlgorithmType) => number[];
}

// Class implementing the SortingService interface
class SortingServiceImpl implements SortingService {

  // Bubble Sort algorithm
  private bubbleSort(array: number[]): number[] {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
        }
      }
    }
    return array;
  }

  // Selection Sort algorithm
  private selectionSort(array: number[]): number[] {
    for (let i = 0; i < array.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
      }
    }
    return array;
  }

  // Insertion Sort algorithm
  private insertionSort(array: number[]): number[] {
    for (let i = 1; i < array.length; i++) {
      let current = array[i], j = i - 1;
      while (j >= 0 && array[j] > current) {
        array[j + 1] = array[j];
        j--;
      }
      array[j + 1] = current;
    }
    return array;
  }

  // Public method to sort array using specified algorithm
  public sort(array: number[], algorithm: SortingAlgorithmType): number[] {
    if (!array || !algorithm) {
      throw new Error('Invalid input: array and algorithm are required');
    }

    switch (algorithm) {
      case SortingAlgorithmType.BUBBLE_SORT:
        return this.bubbleSort(array);
      case SortingAlgorithmType.SELECTION_SORT:
        return this.selectionSort(array);
      case SortingAlgorithmType.INSERTION_SORT:
        return this.insertionSort(array);
      default:
        throw new Error(`Unsupported algorithm: ${algorithm}`);
    }
  }
}

// GraphQL schema definition
const typeDefs = gql`
  type Query {
    sortArray(array: [Int]!, algorithm: SortingAlgorithmType!): [Int]
  }
  enum SortingAlgorithmType { BUBBLE_SORT, SELECTION_SORT, INSERTION_SORT }
`;

// Resolver mapping for the schema
const resolvers = {
  Query: {
    sortArray: (_, { array, algorithm }) => {
      const sortingService = new SortingServiceImpl();
      return sortingService.sort(array, algorithm);
    },
  },
  SortingAlgorithmType: SortingAlgorithmType,
};

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    // Context properties can be added here
  }),
  formatError: (error) => {
    // Custom error formatting can be added here
    return error;
  },
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});