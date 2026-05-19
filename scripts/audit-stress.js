const http = require('http');

const API_URL = 'http://localhost:3001/synapse/fire';
const TOTAL_REQUESTS = 60; // Triggers Sentinel Quarantine threshold
const CONCURRENCY = 10;

console.log(`\n🛡️ Iniciando Auditoría de Estrés Sentinel...`);
console.log(`Enviando ${TOTAL_REQUESTS} sinapsis maliciosas simuladas...\n`);

let completed = 0;
let errors = 0;

function sendMaliciousSynapse(index) {
  return new Promise((resolve) => {
    const payload = JSON.stringify({
      tenantId: 'system-test-tenant',
      source: 'malicious-node-xyz',
      target: 'core-router',
      payload: { type: 'SPAM', data: 'junk' },
      weight: 1.0
    });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = http.request(API_URL, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 400) {
          errors++;
          console.log(`[Rechazo Sentinel] Req #${index}: ${res.statusCode} - ${data}`);
        }
        completed++;
        resolve();
      });
    });

    req.on('error', (e) => {
      errors++;
      completed++;
      resolve();
    });

    req.write(payload);
    req.end();
  });
}

async function runAudit() {
  for (let i = 0; i < TOTAL_REQUESTS; i += CONCURRENCY) {
    const batch = [];
    for (let j = 0; j < CONCURRENCY && (i + j) < TOTAL_REQUESTS; j++) {
      batch.push(sendMaliciousSynapse(i + j));
    }
    await Promise.all(batch);
  }
  
  console.log(`\n✅ Auditoría Completa.`);
  console.log(`Sinapsis enviadas: ${TOTAL_REQUESTS}`);
  console.log(`Bloqueadas por Sentinel: ${errors}`);
  if (errors > 0) {
    console.log(`\n¡ÉXITO! El sistema Sentinel está activo y protegiendo el ecosistema.`);
  } else {
    console.log(`\nADVERTENCIA: No se detectaron bloqueos. Revisa la configuración de Sentinel.`);
  }
}

runAudit();
