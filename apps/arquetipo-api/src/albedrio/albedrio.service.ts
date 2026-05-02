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
    // Regla de ejemplo: Alerta de Alto Valor
    this.engine.addRule({
      conditions: {
        any: [{
          all: [
            {
              fact: 'amount',
              operator: 'greaterThan',
              value: 5000
            }
          ]
        }]
      },
      event: {
        type: 'HIGH_VALUE_TRANSACTION',
        params: {
          message: 'Transacción de alto valor detectada por Albedrío'
        }
      }
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
