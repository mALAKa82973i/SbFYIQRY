// 代码生成时间: 2025-07-31 15:52:32
import { Injectable, Inject } from '@nestjs/common';

// 定义一个接口，描述随机数生成器的配置
interface RandomNumberGeneratorConfig {
  maxValue: number;
  minValue: number;
}

// 随机数生成器服务
@Injectable()
export class RandomNumberGeneratorService {

  private config: RandomNumberGeneratorConfig;

  constructor(@Inject('RANDOM_NUMBER_CONFIG') config: RandomNumberGeneratorConfig) {
    this.config = config;
  }

  // 生成随机数
  generateRandomNumber(): number {
    if (this.config.minValue >= this.config.maxValue) {
      throw new Error('minValue must be less than maxValue');
    }

    const max = this.config.maxValue;
    const min = this.config.minValue;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

// 随机数生成器模块
import { Module } from '@nestjs/common';
import { RandomNumberGeneratorService } from './randomNumberGenerator.service';

// 配置对象
export const randomNumberGeneratorConfig = {
  maxValue: 100,
  minValue: 1,
};

@Module({
  providers: [
    RandomNumberGeneratorService,
    {
      provide: 'RANDOM_NUMBER_CONFIG',
      useValue: randomNumberGeneratorConfig,
    },
  ],
})
export class RandomNumberGeneratorModule {}
