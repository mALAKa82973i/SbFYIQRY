// 代码生成时间: 2025-09-23 13:00:08
 * Features:
 * - Backups files in a specified directory to a backup location.
 * - Synchronizes files between a source and a destination directory.
 *
 * Error handling:
 * - Catches and logs errors during backup and sync operations.
 */

import { existsSync, readFileSync, writeFileSync, readdirSync, promises as fsPromises } from 'fs';
import { join, resolve } from 'path';

// Define a class to handle file backup and synchronization
class FileBackupSyncTool {

  // Constructor to accept source and destination paths
  constructor(private sourcePath: string, private backupPath: string, private syncPath: string) {}

  // Backup files from source to backup location
  public async backupFiles(): Promise<void> {
    try {
      await this.ensureDirectoryExists(this.backupPath);
      const files = this.listFiles(this.sourcePath);

      for (const file of files) {
        const sourceFile = join(this.sourcePath, file);
        const backupFile = join(this.backupPath, file);

        if (!existsSync(backupFile)) {
          await this.copyFile(sourceFile, backupFile);
        } else {
          console.log(`Backup file already exists: ${backupFile}`);
        }
      }
    } catch (error) {
      console.error('Error during backup:', error);
    }
  }

  // Synchronize files between source and destination
  public async syncFiles(): Promise<void> {
    try {
      const sourceFiles = this.listFiles(this.sourcePath);
      const syncFiles = this.listFiles(this.syncPath);

      for (const file of sourceFiles) {
        const sourceFile = join(this.sourcePath, file);
        const syncFile = join(this.syncPath, file);

        if (!existsSync(syncFile)) {
          await this.copyFile(sourceFile, syncFile);
        } else {
          const sourceMTime = await this.getModifiedTime(sourceFile);
          const syncMTime = await this.getModifiedTime(syncFile);

          if (sourceMTime > syncMTime) {
            await this.copyFile(sourceFile, syncFile);
          }
        }
      }
    } catch (error) {
      console.error('Error during synchronization:', error);
    }
  }

  // Helper method to list files in a directory
  private listFiles(directory: string): string[] {
    return readdirSync(directory);
  }

  // Helper method to copy a file from source to destination
  private async copyFile(source: string, destination: string): Promise<void> {
    const data = readFileSync(source);
    writeFileSync(destination, data);
  }

  // Helper method to ensure a directory exists
  private async ensureDirectoryExists(directory: string): Promise<void> {
    return fsPromises.mkdir(directory, { recursive: true });
  }

  // Helper method to get the last modified time of a file
  private async getModifiedTime(file: string): Promise<number> {
    return (await fsPromises.stat(file)).mtimeMs;
  }
}

// Usage example
const sourcePath = './source';
const backupPath = './backup';
const syncPath = './sync';

const tool = new FileBackupSyncTool(sourcePath, backupPath, syncPath);

tool.backupFiles();
tool.syncFiles();