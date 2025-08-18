// 代码生成时间: 2025-08-18 18:22:31
import { ApolloClient, InMemoryCache, gql, NormalizedCacheObject } from '@apollo/client';
import { performance } from 'perf_hooks';

// Constants for GraphQL endpoint
const GRAPHQL_ENDPOINT = 'http://your-graphql-endpoint.com/graphql';

// GraphQL query to fetch system performance metrics
const SYSTEM_PERFORMANCE_QUERY = gql`
  query SystemPerformance($osName: String!) {
    systemPerformance(osName: $osName) {
      cpuUsage
      memoryUsage
      diskUsage
      networkUsage
    }
  }
`;

// Define the ApolloClient instance
const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

class SystemPerformanceMonitor {
  private cache: NormalizedCacheObject;

  constructor() {
    // Initialize the cache from the ApolloClient instance
    this.cache = client.cache;
  }

  /**
   * Fetch system performance metrics for a given operating system
   *
   * @param osName The name of the operating system
   * @returns A Promise that resolves to system performance data
   */
  public async fetchSystemPerformance(osName: string): Promise<any> {
    try {
      // Start performance monitoring
      const start = performance.now();

      // Execute the GraphQL query
      const { data } = await client.query({
        query: SYSTEM_PERFORMANCE_QUERY,
        variables: { osName },
      });

      // Calculate the duration of the fetch operation
      const duration = performance.now() - start;
      console.log(`Fetch duration: ${duration} milliseconds`);

      // Return the system performance data
      return data;
    } catch (error) {
      // Handle any errors that occur during the fetch operation
      console.error('Error fetching system performance data:', error);
      throw error;
    }
  }
}

// Example usage
const monitor = new SystemPerformanceMonitor();
monitor.fetchSystemPerformance('Windows').then((data) => {
  console.log('System Performance Data:', data);
});