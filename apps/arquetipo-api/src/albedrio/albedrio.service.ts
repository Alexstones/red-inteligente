import { Injectable } from '@nestjs/common';
import { Engine } from 'json-rules-engine';

@Injectable()
export class AlbedrioService {
  private engine: Engine;

  constructor() {
    this.engine = new Engine();
    this.setupBaseRules();
  }

  private setupBaseRules() {
    // Rule 1: High Value Transaction
    this.engine.addRule({
      conditions: {
        all: [{ fact: 'amount', operator: 'greaterThan', value: 10000 }]
      },
      event: { type: 'REBALANCING_REQUIRED', params: { priority: 'HIGH', action: 'SECURITY_LOCK' } }
    });

    // Rule 2: Neural Frequency Overload
    this.engine.addRule({
      conditions: {
        all: [{ fact: 'synapse_rate', operator: 'greaterThan', value: 100 }]
      },
      event: { type: 'NODE_SCALING', params: { action: 'ALLOCATE_BACKBONE' } }
    });

    // Rule 3: Reward Optimization
    this.engine.addRule({
      conditions: {
        all: [{ fact: 'network_health', operator: 'lessThan', value: 0.9 }]
      },
      event: { type: 'INCENTIVE_BOOST', params: { multiplier: 1.5 } }
    });
  }

  /**
   * Evalúa una sinapsis o dato contra el motor de reglas determinísticas
   */
  async evaluate(fact: any): Promise<any[]> {
    const { events } = await this.engine.run(fact);
    return events;
  }

  /**
   * Permite añadir reglas dinámicas al motor de decisiones
   */
  addRule(rule: any) {
    this.engine.addRule(rule);
  }
}
