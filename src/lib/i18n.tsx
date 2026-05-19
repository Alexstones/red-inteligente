"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en';

const translations = {
  es: {
    dashboard_title: 'Sistema Nervioso Central',
    network_health: 'Salud de la Red',
    wallet_balance: 'Saldo Total',
    active_synapses: 'Sinapsis Activas',
    neural_load: 'Carga Neural',
    explorer: 'Explorador',
    new_synapse: 'Nueva Sinapsis',
    security_layer: 'Capa de Seguridad',
    all_rights_reserved: 'Todos los derechos reservados',
  },
  en: {
    dashboard_title: 'Central Nervous System',
    network_health: 'Network Health',
    wallet_balance: 'Total Balance',
    active_synapses: 'Active Synapses',
    neural_load: 'Neural Load',
    explorer: 'Explorer',
    new_synapse: 'New Synapse',
    security_layer: 'Security Layer',
    all_rights_reserved: 'All rights reserved',
  }
};

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof typeof translations.es) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('es');

  const t = (key: keyof typeof translations.es) => {
    return translations[lang][key] || key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
}
