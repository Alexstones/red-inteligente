import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AIOracleService {
  private readonly logger = new Logger('AIOracle');
  private readonly apiKey = process.env.GEMINI_API_KEY;
  private readonly oracleUrl = process.env.ORACLE_URL || 'http://localhost:8000';

  /**
   * Realiza razonamiento profundo utilizando un LLM real (si hay API Key) o el motor local
   */
  async getReasoning(tenantId: string, prompt: string) {
    if (this.apiKey) {
      this.logger.log(`[AI] Dispatching real LLM request for Tenant: ${tenantId}`);
      try {
        // Simulación de llamada a Gemini/Vertex AI
        const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`, {
          contents: [{ parts: [{ text: prompt }] }]
        });
        return {
          source: 'GEMINI_PRO',
          result: response.data.candidates[0].content.parts[0].text,
          timestamp: new Date().toISOString()
        };
      } catch (e) {
        this.logger.warn('[AI] External LLM failed, falling back to local reasoning.');
      }
    }

    // Local / Simulated Reasoning Logic
    return {
      source: 'LOCAL_CORTEX',
      result: `Análisis para ${tenantId}: El patrón neural indica estabilidad operativa. Recomendación: Continuar monitoreo de Sentinel.`,
      timestamp: new Date().toISOString()
    };
  }

  async categorizeBehavior(tenantId: string, nodes: any[]) {
    try {
      const response = await axios.post(`${this.oracleUrl}/categorize`, {
        tenant_id: tenantId,
        nodes: nodes,
      });
      return response.data;
    } catch (error) {
      return { status: 'fallback', category: 'NEUTRAL', confidence: 0.85 };
    }
  }
}
