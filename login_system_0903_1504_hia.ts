// 代码生成时间: 2025-09-03 15:04:49
import { ApolloServer, gql } from 'apollo-server';
import { AuthenticationError } from 'apollo-server-errors';
import { Context } from './context';

// 模拟用户数据
const users = [
  { id: '1', username: 'user1', password: 'password1' },
  { id: '2', username: 'user2', password: 'password2' },
];

// 定义类型
type User = {
  id: string;
  username: string;
  password: string;
};

// 定义GraphQL类型
const typeDefs = gql`
  type Query {
    login(username: String!, password: String!): User
  }
`;

// 定义解析器
const resolvers = {
  Query: {
    login: async (_, { username, password }) => {
      const user = users.find((u) => u.username === username && u.password === password);
      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }
      return user;
    },
  },
};

// 创建Apollo服务器
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (): Context => ({}), // 提供上下文（例如数据库连接）
});

// 启动服务器
server.listen().then(() => {
  console.log('🚀 Server is running!');
});

// 导出服务器实例
export default server;
