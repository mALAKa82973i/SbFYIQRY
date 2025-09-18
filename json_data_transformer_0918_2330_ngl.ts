// 代码生成时间: 2025-09-18 23:30:36
import { ApolloServer, gql } from 'apollo-server';
import { parse, stringify } from 'flatted'; // 使用flatted替代JSON处理

// GraphQL schema定义
const typeDefs = gql"""
  type Query {
    convertJson(inputJson: String!): String
  }
""";

// Resolvers 定义
const resolvers = {
  Query: {
    convertJson: async (_, { inputJson }) => {
      try {
        // 将输入字符串解析为JSON对象
        const parsedJson = parse(inputJson);

        // 将JSON对象转换回字符串
        const outputJson = stringify(parsedJson);

        return outputJson;
      } catch (error) {
        console.error('JSON parsing or stringifying error:', error);
        throw new Error('Failed to transform JSON.');
      }
    },
  },
};

// 创建Apollo Server实例
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // 配置以支持GraphQL Playground
  playground: {
    settings: {
      'editor.theme': 'dark',
    },
    tabs: [
      {
        query: typeDefs,
        // 可以在这里预设一个示例查询
        variables: '{}',
        response: '{
          "data": {
            "convertJson": "{\"key\": "value\"}"
          }
        }',
      },
    ],
  },
});

// 启动服务器
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});