import { Engine } from 'json-rules-engine';

class AlbedrioEngine {
  private engine: Engine;
  private static instance: AlbedrioEngine;

  private constructor() {
    this.engine = new Engine();
    this.setupBaseRules();
  }

  public static getInstance(): AlbedrioEngine {
    if (!AlbedrioEngine.instance) {
      AlbedrioEngine.instance = new AlbedrioEngine();
    }
    return AlbedrioEngine.instance;
  }

  private setupBaseRules() {
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

  public async evaluate(fact: any) {
    const { events } = await this.engine.run(fact);
    return events;
  }
}

export const albedrioEngine = AlbedrioEngine.getInstance();
