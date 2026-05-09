import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AIOracleService {
  private readonly oracleUrl = process.env.ORACLE_URL || 'http://localhost:8000';

  async categorizeBehavior(tenantId: string, nodes: any[]) {
    try {
      const response = await axios.post(`${this.oracleUrl}/categorize`, {
        tenant_id: tenantId,
        nodes: nodes,
      });
      return response.data;
    } catch (error) {
      console.error('Error calling AI Oracle:', error.message);
      return { status: 'error', message: 'Could not reach AI Oracle' };
    }
  }

  async getReasoning(tenantId: string, prompt: string) {
    try {
      const response = await axios.post(`${this.oracleUrl}/reason`, {
        prompt,
        tenant_id: tenantId,
      });
      return response.data;
    } catch (error) {
      console.error('Error calling AI Oracle reasoning:', error.message);
      return { status: 'error', message: 'Could not reach AI Oracle' };
    }
  }
}
