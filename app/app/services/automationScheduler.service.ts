import axios from "axios";
import type { ScheduleConfig } from "~/lib/types/automation";

export class AutomationSchedulerService {
  private static apiUrl = "/automation-scheduler";

  static async getScheduledRules(): Promise<{ ruleId: number; ruleName: string; schedule: ScheduleConfig }[]> {
    const response = await axios.get(`${this.apiUrl}/rules`);
    return response.data;
  }

  static async updateSchedule(ruleId: number, schedule: ScheduleConfig | null): Promise<void> {
    await axios.put(`${this.apiUrl}/rules/${ruleId}`, { schedule });
  }

  static async getPendingExecutions(): Promise<{
    ruleId: number;
    ruleName: string;
    nextRun: string;
  }[]> {
    const response = await axios.get(`${this.apiUrl}/pending`);
    return response.data;
  }
}