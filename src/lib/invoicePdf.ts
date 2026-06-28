function authHeaders(): Record<string, string> {
  const token = localStorage.getItem('flowinvoice_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function fetchPdfBlob(path: string): Promise<Blob> {
  const res = await fetch(path, { headers: authHeaders() });
  const contentType = res.headers.get('content-type') || '';

  if (!res.ok) {
    if (contentType.includes('json')) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Failed to load PDF (${res.status})`);
    }
    const text = await res.text().catch(() => '');
    throw new Error(text || `Failed to load PDF (${res.status})`);
  }

  const blob = await res.blob();
  if (!contentType.includes('pdf') && blob.type && !blob.type.includes('pdf')) {
    const text = await blob.text();
    try {
      const err = JSON.parse(text);
      throw new Error(err.error || 'Server did not return a PDF');
    } catch {
      throw new Error('Server did not return a PDF');
    }
  }
  return blob;
}

export async function loadPdfUrl(path: string): Promise<string> {
  const blob = await fetchPdfBlob(path);
  return URL.createObjectURL(blob);
}

export function openInvoicePdf(invoiceId: string) {
  return loadPdfUrl(`/api/invoices/${invoiceId}/pdf`);
}

export function loadClientTemplatePreview(clientId: string) {
  return loadPdfUrl(`/api/clients/${clientId}/invoice-template/preview`);
}

export function loadClientTemplatePreviewByCode(clientCode: string) {
  return loadPdfUrl(`/api/clients/code/${encodeURIComponent(clientCode)}/invoice-template/preview`);
}
