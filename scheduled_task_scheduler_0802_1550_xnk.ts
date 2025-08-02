// 代码生成时间: 2025-08-02 15:50:56
 * It utilizes APOLLO's Scheduler class to schedule tasks at specific times or intervals.
 */

import { Injectable } from '@nestjs/common';
import { ScheduleOptions, Cron, CronExpression } from '@nestjs/schedule';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class ScheduledTaskScheduler {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  /**
   * Schedule a task to run at a specific time.
   * @param name - The name of the scheduled task.
   * @param cronExpression - The cron expression defining when to run the task.
   * @param task - The task function to execute.
   */
  scheduleTask(name: string, cronExpression: string, task: () => void): void {
    try {
      this.schedulerRegistry.addSchedule(name, task, cronExpression);
      console.log(`Task ${name} scheduled successfully with cron expression: ${cronExpression}`);
    } catch (error) {
      console.error(`Error scheduling task ${name}:`, error);
    }
  }

  /**
   * Execute a task immediately.
   * @param task - The task function to execute.
   */
  executeTaskImmediately(task: () => void): void {
    try {
      task();
      console.log('Task executed successfully.');
    } catch (error) {
      console.error('Error executing task:', error);
    }
  }

  /**
   * Cancel a scheduled task.
   * @param name - The name of the scheduled task to cancel.
   */
  cancelTask(name: string): void {
    try {
      this.schedulerRegistry.deleteSchedule(name);
      console.log(`Task ${name} canceled successfully.`);
    } catch (error) {
      console.error(`Error canceling task ${name}:`, error);
    }
  }

  /**
   * Example of a scheduled task. This will be run every day at 12:00 AM.
   */
  private async exampleTask(): Promise<void> {
    // Perform some task logic here.
    console.log('Example task executed.');
  }
}

// Example of usage:
// const scheduler = new ScheduledTaskScheduler();
// scheduler.scheduleTask(
//   'dailyTask',
//   '0 0 * * * *', // Runs every day at midnight.
//   () => scheduler.exampleTask(),
// );