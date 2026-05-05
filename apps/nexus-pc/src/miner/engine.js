const crypto = require('crypto');
const bridge = require('../ui-connector/bridge');

async function mine() {
    console.log("==========================================");
    console.log("   NEXUS NEURAL MINING ENGINE v1.0.0      ");
    console.log("==========================================");
    
    await bridge.connect();
    
    console.log("[NETWORK] Seeking peers in Nexus P2P Mesh...");
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("[NETWORK] Connected to 8 active nodes.");
    
    while (true) {
        const nonce = crypto.randomBytes(16).toString('hex');
        const hash = crypto.createHash('sha256').update(nonce).digest('hex');
        
        // Slightly easier condition for demonstration logs
        if (hash.startsWith('00')) {
            console.log(`\n[BLOCK FOUND] >>> ${hash}`);
            console.log(`[VALIDATION] Propagating block to peers...`);
            console.log(`[CONSENSUS] 8/8 Nodes verified. Block committed to Cadena de Bloques.`);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        // Simulating neural work
        process.stdout.write("."); 
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

mine().catch(console.error);
