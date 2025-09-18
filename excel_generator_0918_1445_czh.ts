// 代码生成时间: 2025-09-18 14:45:13
 * It includes error handling and is structured for maintainability and extensibility.
 *
 * @module ExcelGenerator
 */

import ExcelJS from 'exceljs';
import * as fs from 'fs';
import * as path from 'path';

// Define the interface for the Excel data
interface ExcelData {
  [key: string]: any;
}

// Define the interface for the Excel options
interface ExcelOptions {
  filename: string;
  data: ExcelData[];
  header?: string[];
}

class ExcelGenerator {
  private workbook: ExcelJS.Workbook;

  constructor() {
    this.workbook = new ExcelJS.Workbook();
  }

  /**
   * Generate an Excel file based on the provided data and options.
   *
   * @param {ExcelOptions} options - Options to customize the Excel file generation.
   * @returns {Promise<void>} - A promise that resolves when the Excel file is generated.
   */
  public async generateExcel(options: ExcelOptions): Promise<void> {
    try {
      // Create a new worksheet
      const worksheet = this.workbook.addWorksheet('Data');

      // If headers are provided, add them to the worksheet
      if (options.header) {
        worksheet.columns = options.header.map(header => ({ header, key: header.toLowerCase() }));
        worksheet.addRow(options.header);
      }

      // Add rows of data to the worksheet
      options.data.forEach(row => worksheet.addRow(row));

      // Save the workbook to a file
      const filePath = path.join(__dirname, options.filename);
      await this.workbook.xlsx.writeFile(filePath);

      console.log(`Excel file generated at: ${filePath}`);
    } catch (error) {
      console.error('Error generating Excel file:', error);
      throw error;
    }
  }
}

// Example usage of the ExcelGenerator class
(async () => {
  const generator = new ExcelGenerator();
  try {
    await generator.generateExcel({
      filename: 'example.xlsx',
      data: [
        { id: 1, name: 'John Doe', age: 30 },
        { id: 2, name: 'Jane Doe', age: 25 },
      ],
      header: ['ID', 'Name', 'Age'],
    });
  } catch (error) {
    console.error('Failed to generate Excel file:', error);
  }
})();