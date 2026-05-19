import { Synapse, Block } from '../../../../packages/neural-core/index';
import axios from 'axios';
import * as dotenv from 'dotenv';
import * as os from 'os';

dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001';
const BLOCKCHAIN_URL = process.env.BLOCKCHAIN_URL || 'http://localhost:3002';
const DIFFICULTY = 4; // Mayor dificultad para hardware acelerado

async function mine() {
  console.clear();
  console.log("\x1b[35m%s\x1b[0m", "==========================================");
  console.log("\x1b[35m%s\x1b[0m", "   NEXUS NEURAL MINING ENGINE v4.0.0      ");
  console.log("\x1b[35m%s\x1b[0m", "   (Deep Intelligence & GPU Layer)        ");
  console.log("\x1b[35m%s\x1b[0m", "==========================================");

  const hostname = os.hostname();
  const cpus = os.cpus().length;
  
  // Simulación de detección de GPU
  const hasGPU = Math.random() > 0.3; // 70% de probabilidad de simular una GPU
  const accelerationType = hasGPU ? "CUDA/TensorCores ACTIVE" : "CPU ONLY";
  
  console.log(`[SYSTEM] Host: ${hostname} | Cores: ${cpus}`);
  console.log(`[HARDWARE] Acceleration: \x1b[32m${accelerationType}\x1b[0m`);
  console.log("[NETWORK] Authenticating with Nexus Central...");
  
  const authHeader = { 'Authorization': 'Bearer SIMULATED_TOKEN' };

  let blockCount = 0;
  let totalNEX = 0;

  while (true) {
    const memoryUsage = (1 - os.freemem() / os.totalmem()) * 100;
    const baseHashrate = hasGPU ? 5000 : 500;
    const hashrate = Math.floor(Math.random() * (baseHashrate * 0.2)) + baseHashrate;

    console.log(`\n\x1b[36m[MINER] Starting computation for block #${blockCount + 1}...\x1b[0m`);
    console.log(`[TELEMETRY] Load: ${os.loadavg()[0].toFixed(2)} | Mem: ${memoryUsage.toFixed(1)}% | Speed: \x1b[33m${hashrate} MH/s\x1b[0m`);
    
    try {
      let synapses: Synapse[] = [];
      try {
        const response = await axios.get(`${BLOCKCHAIN_URL}/blocks`);
        synapses = response.data[0]?.synapses?.slice(0, 5) || [];
      } catch (e) {
        synapses = [new Synapse('system-io', 'nexus-core', 1.0, { task: 'Autonomous Rebalancing' })];
      }

      const newBlock = new Block(blockCount, synapses, '0000_PREV_HASH');
      
      const startTime = Date.now();
      // Simular computación paralela si tiene GPU
      const computeDelay = hasGPU ? 1000 : 3000;
      await new Promise(r => setTimeout(r, computeDelay));
      newBlock.mineBlock(DIFFICULTY);
      const endTime = Date.now();

      console.log(`\x1b[32m[SUCCESS] Block found!\x1b[0m Hash: ${newBlock.hash.substring(0, 16)}...`);
      console.log(`[METRICS] Time: ${endTime - startTime}ms | Nonce: ${newBlock.nonce}`);
      
      // Reclamar recompensa
      try {
        const rewardRes = await axios.post(`${API_BASE_URL}/wallet/mine`, { hashrate }, { headers: authHeader });
        const reward = rewardRes.data.amount || (hashrate / 1000).toFixed(4);
        totalNEX += parseFloat(reward.toString());
        console.log(`\x1b[33m[REWARD] +${reward} NEX earned. Total Balance: ${totalNEX.toFixed(4)} NEX\x1b[0m`);
      } catch (err) {
        console.log(`[ERR] Reward claim failed.`);
      }

      blockCount++;
    } catch (error) {
      console.error("[ERROR] Cycle failed:", error);
    }

    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

mine().catch(error => {
  console.error("[CRITICAL ERROR]", error);
  process.exit(1);
});
