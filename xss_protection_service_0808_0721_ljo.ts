// 代码生成时间: 2025-08-08 07:21:32
import { Injectable, BadRequestException } from '@nestjs/common';
import * as xss from 'xss';

@Injectable()
export class XssProtectionService {
  private readonly xssFilter = xss({
    onIgnoreTagAttr: (tag, attr, isWhiteAttr, value) => {
      throw new BadRequestException(`XSS detected: ${attr} attribute is not allowed`);
    },
    onIgnoreTag: (tag) => {
      throw new BadRequestException(`XSS detected: ${tag} tag is not allowed`);
    },
    onTagAttr: (tag, name, value) => {
      // If a tag attribute value is not sanitized, throw an error
      if (xss.isXSS(name, value)) {
        throw new BadRequestException(`XSS detected: ${value} contains malicious content`);
      }
    }
  });

  constructor() {}

  /**
   * Sanitizes the input to prevent XSS attacks.
   * @param userInput The input from the user that needs to be sanitized.
   * @returns The sanitized input.
   * @throws BadRequestException If the input contains XSS patterns.
   */
  sanitizeInput(userInput: string): string {
    try {
      const sanitizedInput = this.xssFilter.process(userInput);
      return sanitizedInput;
    } catch (error) {
      // If an error occurs during sanitization, rethrow it as a BadRequestException
      throw new BadRequestException(error.message);
    }
  }

  // Additional methods related to XSS protection can be added here.
}
