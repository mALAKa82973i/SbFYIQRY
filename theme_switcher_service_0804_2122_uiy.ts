// 代码生成时间: 2025-08-04 21:22:26
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Theme } from './theme.entity'; // Assuming Theme entity is defined in theme.entity.ts

@Injectable()
export class ThemeSwitcherService {
  
  // Inject the TypeORM repository for the Theme entity
  constructor(
    @InjectRepository(Theme)
    private themeRepository: Repository<Theme>,
  ) {
  }

  /**
   * Switches the theme for the specified user.
   *
   * @param userId The ID of the user for whom to switch the theme.
   * @param newTheme The new theme to apply.
   * @returns A promise that resolves to the updated user's theme.
   */
  async switchTheme(userId: number, newTheme: string): Promise<Theme> {
    try {
      // Find the current theme for the user
      const userTheme = await this.themeRepository.findOne({
        where: { userId },
      });

      if (!userTheme) {
        // If no theme is found, create a new one
        userTheme = new Theme();
        userTheme.userId = userId;
      }

      // Set the new theme
      userTheme.themeName = newTheme;

      // Save the updated theme
      return await this.themeRepository.save(userTheme);

    } catch (error) {
      // Handle any errors that occur during the theme switch
      throw new Error('Failed to switch theme: ' + error.message);
    }
  }
}
