/**
 * Nexus UI Connector Bridge
 * Simulates the connection between the local PC miner and the Nexus Web Dashboard.
 */

const axios = require('axios');

class NexusBridge {
    constructor() {
        this.webDashboardUrl = "http://localhost:3000"; // Default Next.js dev port
        this.status = "DISCONNECTED";
        this.peerId = "NEXUS-NODE-" + Math.random().toString(36).substring(7).toUpperCase();
    }

    async connect() {
        console.log(`[BRIDGE] Attempting to connect to Nexus Dashboard at ${this.webDashboardUrl}...`);
        this.status = "CONNECTING";
        
        // Simulating handshake
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        this.status = "CONNECTED";
        console.log(`[BRIDGE] Connection established. Peer ID: ${this.peerId}`);
        this.startSync();
    }

    startSync() {
        setInterval(() => {
            if (this.status === "CONNECTED") {
                const telemetry = {
                    nodeId: this.peerId,
                    cpu: (Math.random() * 100).toFixed(2) + "%",
                    memory: (Math.random() * 4096).toFixed(0) + "MB",
                    uptime: process.uptime().toFixed(0) + "s",
                    status: "ACTIVE"
                };
                console.log(`[SYNC] Pushing telemetry to dashboard:`, telemetry);
            }
        }, 5000);
    }
}

const bridge = new NexusBridge();
bridge.connect().catch(console.error);

module.exports = bridge;
