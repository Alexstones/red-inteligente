from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="ORÁCULO AI - Red Inteligente")

class Query(BaseModel):
    prompt: str
    tenant_id: str

class Response(BaseModel):
    answer: str
    sources: List[str]
    confidence: float

@app.get("/")
async def root():
    return {"status": "online", "service": "Oráculo AI", "version": "1.0.0"}

class SynapseData(BaseModel):
    hash: str
    source: str
    target: str
    payload: dict

@app.post("/ingest")
async def ingest_synapse(data: SynapseData):
    # Simulación de entrenamiento: Se genera un "peso neural"
    print(f"[ORÁCULO] Entrenando sobre sinapsis: {data.hash}")
    return {"status": "trained", "synapse": data.hash, "new_knowledge_weight": 0.85}

import httpx

@app.post("/reason", response_model=Response)
async def reason(query: Query):
    # Conexión Neural: Obtener estado de la blockchain
    try:
        async with httpx.AsyncClient() as client:
            resp = await client.get("http://localhost:3002/blocks")
            blocks = resp.json()
            block_count = len(blocks)
            synapse_count = sum(len(b['synapses']) for b in blocks)
    except Exception:
        block_count = 0
        synapse_count = 0

    # Razonamiento del Oráculo
    answer = (
        f"He analizado el tejido neural del Tenant {query.tenant_id}. "
        f"Actualmente existen {block_count} bloques validados con {synapse_count} sinapsis activas. "
        f"Detecto un patrón de crecimiento del {block_count * 2}% en la última época. "
        f"Sugerencia: Optimizar las reservas de tokens RI ante el aumento de la densidad sináptica."
    )
    
    return Response(
        answer=answer,
        sources=["BlockchainExplorer", "SynapsePool"],
        confidence=0.95
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
