"use client";

import { useState, useCallback } from 'react';

export function useVoiceCommand() {
  const [isListening, setIsListening] = useState(false);

  const startListening = useCallback(() => {
    setIsListening(true);
    console.log("[AI] Voice System Activated. Waiting for command...");
    
    // Simulación de detección de voz
    setTimeout(() => {
      setIsListening(false);
      alert("Comando de voz recibido: 'Optimizar red'. Procesando...");
    }, 3000);
  }, []);

  return { isListening, startListening };
}
