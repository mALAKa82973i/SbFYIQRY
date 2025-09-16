// 代码生成时间: 2025-09-16 10:31:29
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

// 定义 GraphQL 查询和突变
const GET_MESSAGES = gql`
  query GetMessages {
    messages {
      id
      content
      timestamp
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation SendMessage($content: String!) {
    sendMessage(message: $content) {
      id
      content
      timestamp
    }
  }
`;

// 创建 Apollo 客户端
const client = new ApolloClient({
  uri: 'YOUR_GRAPHQL_ENDPOINT', // 替换为你的 GraphQL 端点
  cache: new InMemoryCache(),
  link: onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
      });
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  })
});

// 消息通知系统类
class MessageNotificationSystem {
  private client: ApolloClient<InMemoryCache>;

  constructor() {
    // 初始化 Apollo 客户端
    this.client = client;
  }

  // 获取消息列表
  async getMessages(): Promise<Array<{ id: string; content: string; timestamp: string }>> {
    try {
      const { data } = await this.client.query({ query: GET_MESSAGES });
      return data.messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }

  // 发送新消息
  async sendMessage(content: string): Promise<{ id: string; content: string; timestamp: string }> {
    try {
      const { data } = await this.client.mutate({ mutation: SEND_MESSAGE, variables: { content } });
      return data.sendMessage;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
}

// 示例使用
(async () => {
  const notificationSystem = new MessageNotificationSystem();

  try {
    // 获取消息列表
    const messages = await notificationSystem.getMessages();
    console.log('Messages:', messages);

    // 发送新消息
    const newMessage = await notificationSystem.sendMessage('Hello Apollo!');
    console.log('New Message:', newMessage);
  } catch (error) {
    console.error('Error in message notification system:', error);
  }
})();