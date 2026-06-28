import { ensureDispatchDemoInvoices } from '../src/services/dispatchDemoService';

ensureDispatchDemoInvoices()
  .then((n) => {
    console.log(n > 0 ? `Created ${n} demo dispatch invoice(s).` : 'Dispatch demo invoices already present.');
  })
  .catch((e) => {
    console.error('Failed:', e);
    process.exit(1);
  });
