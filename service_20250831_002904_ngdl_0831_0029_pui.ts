// 代码生成时间: 2025-08-31 00:29:04
import * as fs from 'fs';
import * as path from 'path';

// Define the interface for the folder structure configuration
interface FolderStructureConfig {
  [root: string]: FolderStructureConfig | string[];
}

// Define the class for Folder Structure Organizer
class FolderStructureOrganizer {
  private config: FolderStructureConfig;

  // Constructor to initialize the organizer with the given folder structure configuration
  constructor(config: FolderStructureConfig) {
    this.config = config;
  }

  // Method to create folders based on the configuration
  public async createFolders(): Promise<void> {
    try {
      await this.createFolderRecursively(path.resolve(), this.config);
    } catch (error) {
      console.error('An error occurred while creating folders:', error);
    }
  }

  // Recursive method to create folders based on the configuration
  private async createFolderRecursively(currentPath: string, config: FolderStructureConfig | string[]): Promise<void> {
    if (typeof config === 'string') {
      const newPath = path.join(currentPath, config);
      await fs.promises.mkdir(newPath, { recursive: true });
    } else {
      for (const key in config) {
        await this.createFolderRecursively(path.join(currentPath, key), config[key]);
      }
    }
  }
}

// Example usage of the Folder Structure Organizer
const folderStructureConfig: FolderStructureConfig = {
  documents: {
    work: ['project1', 'project2'],
    personal: []
  },
  images: []
};

const organizer = new FolderStructureOrganizer(folderStructureConfig);

organizer.createFolders().then(() => {
  console.log('Folder structure created successfully.');
}).catch((error) => {
  console.error('Failed to create folder structure:', error);
});