const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error en la petición');
  }

  return response.json();
}


export const nodesApi = {
  getNodes: () => apiFetch('/nodes'),
  getInventory: () => apiFetch('/business/inventory'),
  getSales: () => apiFetch('/business/sales'),
};

export const tenantsApi = {
  getTenants: () => apiFetch('/tenants'),
};

export const walletApi = {
  getWallet: () => apiFetch('/wallet'),
  transfer: (data: { toAddress: string, amount: number }) => apiFetch('/wallet/transfer', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

export const governanceApi = {
  getProposals: () => apiFetch('/governance/proposals'),
  vote: (id: string, vote: 'for' | 'against') => apiFetch(`/governance/proposals/${id}/vote`, {
    method: 'POST',
    body: JSON.stringify({ vote }),
  }),
};
