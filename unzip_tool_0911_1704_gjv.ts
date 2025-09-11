// 代码生成时间: 2025-09-11 17:04:19
import * as fs from 'fs';
import * as path from 'path';
import * as archiver from 'archiver';

// Unzipper 类实现压缩文件解压工具功能
class Unzipper {
  // 解压压缩文件到指定目录
  public static async unzip(sourcePath: string, destPath: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        // 检查源文件是否存在
        if (!fs.existsSync(sourcePath)) {
          throw new Error('Source file does not exist');
        }

        // 确保目标目录存在
        const destDir = path.dirname(destPath);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }

        // 创建一个可读流来读取压缩文件
        const readStream = fs.createReadStream(sourcePath);

        // 创建一个解压缩器
        const extract = archiver('zip', { zlib: { level: 9 } });

        // 设置解压缩器的输出目录
        const output = fs.createWriteStream(destPath);

        // 监听错误
        readStream.on('error', err => {
          reject(err);
        });

        // 监听抽取完成事件
        extract.on('finish', () => {
          resolve();
        });

        // 监听错误
        extract.on('error', err => {
          reject(err);
        });

        // 管道连接读取流和解压缩器
        readStream.pipe(extract).pipe(output);
      } catch (error) {
        reject(error);
      }
    });
  }
}

// 使用示例
const sourceZipPath = 'path/to/source.zip';
const destinationFolderPath = 'path/to/destination/folder';

Unzipper.unzip(sourceZipPath, destinationFolderPath)
  .then(() => {
    console.log('Unzipped successfully!');
  })
  .catch(error => {
    console.error('Unzipping failed:', error.message);
  });
