// 代码生成时间: 2025-09-02 08:07:18
import { createPool, Pool, PoolConfig } from 'mysql';

// 定义数据库连接池配置接口
interface IDatabasePoolConfig extends PoolConfig {
  host: string;
  user: string;
  password: string;
  database: string;
}

// 数据库连接池管理器类
class DatabasePoolManager {
  private pool: Pool;

  // 构造函数，用于初始化数据库连接池
  constructor(private config: IDatabasePoolConfig) {
    this.pool = createPool(config);
  }

  // 获取数据库连接
  public async getConnection(): Promise<any> {
    try {
      return await this.pool.getConnection();
    } catch (error) {
      console.error('Failed to get connection from pool:', error);
      throw error;
    }
  }

  // 释放数据库连接
  public async releaseConnection(connection: any): Promise<void> {
    try {
      connection.release();
    } catch (error) {
      console.error('Failed to release connection:', error);
      throw error;
    }
  }

  // 执行查询
  public async executeQuery(query: string, values?: any[]): Promise<any[]> {
    try {
      const connection = await this.getConnection();
      const result = await connection.query(query, values);
      await this.releaseConnection(connection);
      return result;
    } catch (error) {
      console.error('Failed to execute query:', error);
      throw error;
    }
  }

  // 关闭连接池
  public async end(): Promise<void> {
    try {
      await this.pool.end();
    } catch (error) {
      console.error('Failed to end database pool:', error);
      throw error;
    }
  }
}

// 使用示例
const dbConfig: IDatabasePoolConfig = {
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
  // 其他配置...
};

const dbPoolManager = new DatabasePoolManager(dbConfig);

// 异步执行查询
(async () => {
  try {
    const results = await dbPoolManager.executeQuery('SELECT * FROM your_table');
    console.log('Query Results:', results);
  } catch (error) {
    console.error('Error executing query:', error);
  } finally {
    // 记得释放连接池资源
    await dbPoolManager.end();
  }
})();