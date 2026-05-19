const API_BASE_URL = 'http://localhost:3001';


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

export const authApi = {
  login: (credentials: any) => apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  register: (data: any) => apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

export const nodesApi = {
  getNodes: () => apiFetch('/nodes'),
  createNode: (node: any) => apiFetch('/nodes', {
    method: 'POST',
    body: JSON.stringify(node),
  }),
  // Business Neurons
  addInventory: (product: any) => apiFetch('/business/inventory', {
    method: 'POST',
    body: JSON.stringify(product),
  }),
  recordSale: (sale: any) => apiFetch('/business/sale', {
    method: 'POST',
    body: JSON.stringify(sale),
  }),
  getInventory: (tenantId?: string) => apiFetch(`/business/inventory${tenantId ? `?tenantId=${tenantId}` : ''}`),
  getSales: (tenantId?: string) => apiFetch(`/business/sales${tenantId ? `?tenantId=${tenantId}` : ''}`),
  getFinance: (tenantId?: string) => apiFetch(`/business/finance${tenantId ? `?tenantId=${tenantId}` : ''}`),
};

export const tenantsApi = {
  getTenants: () => apiFetch('/tenants'),
  createTenant: (data: any) => apiFetch('/tenants', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

export const oracleApi = {
  reason: (prompt: string, tenantId: string) => fetch('http://localhost:8000/reason', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, tenant_id: tenantId }),
  }).then(res => res.json()),
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
  createProposal: (data: any) => apiFetch('/governance/proposals', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  vote: (id: string, vote: 'for' | 'against') => apiFetch(`/governance/proposals/${id}/vote`, {
    method: 'POST',
    body: JSON.stringify({ vote }),
  }),
};
