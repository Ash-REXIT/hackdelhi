import { useEffect, useMemo, useState } from 'react';
import {
  Database,
  Search,
  Users,
  DollarSign,
  Building2,
  Loader2,
} from 'lucide-react';
import { api } from '@/lib/api';
import type { ClientRecord, EmployeeRecord, PayrollRateRow } from '@/types/api';

function formatMoney(value: number | string | null | undefined, currency = 'AED'): string {
  const n = Number(value || 0);
  if (!n) return '—';
  return `${currency} ${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

function deriveRates(emp: EmployeeRecord): { hourly: number | null; overtime: number | null; pay?: EmployeeRecord['payroll'][0] } {
  const pay = emp.payroll?.[0];
  let hourly: number | null = null;
  let overtime: number | null = null;

  if (pay?.hourlyRate != null && Number(pay.hourlyRate) > 0) hourly = Number(pay.hourlyRate);
  else if (emp.hourlyRate != null && Number(emp.hourlyRate) > 0) hourly = Number(emp.hourlyRate);
  else {
    const gross = Number(pay?.gross ?? pay?.baseSalary ?? pay?.netPay ?? 0);
    const days = pay?.workingDays && pay.workingDays > 0 ? pay.workingDays : 22;
    if (gross > 0) hourly = gross / (days * 8);
  }

  if (pay?.overtimeRate != null && Number(pay.overtimeRate) > 0) overtime = Number(pay.overtimeRate);
  else if (hourly) overtime = hourly * 1.5;

  return { hourly, overtime, pay };
}

function toRateRows(employees: EmployeeRecord[]): PayrollRateRow[] {
  return employees
    .map((emp) => {
      const { hourly, overtime, pay } = deriveRates(emp);
      if (!hourly && !overtime) return null;
      return {
        employeeId: emp.employeeId,
        name: emp.name,
        designation: emp.designation,
        clientName: emp.client?.name || '—',
        clientCode: emp.client?.clientCode || '—',
        hourlyRate: hourly ? formatMoney(hourly, pay?.currency || emp.client?.currency || 'AED') : '—',
        overtimeRate: overtime ? formatMoney(overtime, pay?.currency || emp.client?.currency || 'AED') : '—',
        currency: pay?.currency || emp.client?.currency || 'AED',
        period: pay?.period?.replace('June2026', 'June 2026') || 'June 2026',
      };
    })
    .filter(Boolean) as PayrollRateRow[];
}

export function MasterData() {
  const [activeTab, setActiveTab] = useState<'employees' | 'clients' | 'rates'>('employees');
  const [employees, setEmployees] = useState<EmployeeRecord[]>([]);
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api<EmployeeRecord[]>('/api/employees?limit=500'),
      api<ClientRecord[]>('/api/clients'),
    ])
      .then(([emps, cls]) => {
        setEmployees(emps);
        setClients(cls);
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load master data'))
      .finally(() => setLoading(false));
  }, []);

  const filteredEmployees = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return employees;
    return employees.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.employeeId.toLowerCase().includes(q) ||
        (e.designation || '').toLowerCase().includes(q) ||
        (e.department || '').toLowerCase().includes(q) ||
        (e.client?.name || '').toLowerCase().includes(q) ||
        (e.client?.clientCode || '').toLowerCase().includes(q)
    );
  }, [employees, search]);

  const filteredClients = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return clients;
    return clients.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.clientCode.toLowerCase().includes(q) ||
        (c.industry || '').toLowerCase().includes(q) ||
        (c.city || '').toLowerCase().includes(q)
    );
  }, [clients, search]);

  const rateRows = useMemo(() => {
    const rows = toRateRows(employees);
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.employeeId.toLowerCase().includes(q) ||
        r.clientName.toLowerCase().includes(q) ||
        (r.designation || '').toLowerCase().includes(q)
    );
  }, [employees, search]);

  const tabLabel =
    activeTab === 'employees' ? 'employees' : activeTab === 'clients' ? 'clients' : 'payroll rates';

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="pt-8 px-10 pb-6 shrink-0 border-b border-[#2A3442]/50 bg-[#0B0F14] z-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-1">Master Data</h1>
          <p className="text-muted-foreground text-[15px]">
            ERP reference data from TASC seed — {employees.length} employees across {clients.length} clients.
          </p>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 border-r border-[#2A3442]/50 bg-[#0B0F14] p-6 space-y-2 shrink-0 hidden md:block">
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4 pl-3">Data Tables</div>
          <button
            onClick={() => setActiveTab('employees')}
            className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'employees'
                ? 'bg-panel text-foreground shadow-sm border border-border/50'
                : 'text-muted-foreground hover:text-foreground hover:bg-panel/50'
            }`}
          >
            <Users size={16} className="mr-3" /> Employees
            <span className="ml-auto text-xs font-mono text-muted-foreground">{employees.length}</span>
          </button>
          <button
            onClick={() => setActiveTab('clients')}
            className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'clients'
                ? 'bg-panel text-foreground shadow-sm border border-border/50'
                : 'text-muted-foreground hover:text-foreground hover:bg-panel/50'
            }`}
          >
            <Building2 size={16} className="mr-3" /> Clients
            <span className="ml-auto text-xs font-mono text-muted-foreground">{clients.length}</span>
          </button>
          <button
            onClick={() => setActiveTab('rates')}
            className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'rates'
                ? 'bg-panel text-foreground shadow-sm border border-border/50'
                : 'text-muted-foreground hover:text-foreground hover:bg-panel/50'
            }`}
          >
            <DollarSign size={16} className="mr-3" /> Payroll Rates
            <span className="ml-auto text-xs font-mono text-muted-foreground">{rateRows.length}</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-10 bg-[#0B0F14]">
          <div className="max-w-6xl space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div className="relative w-80">
                <Search className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={`Search ${tabLabel}...`}
                  className="w-full bg-panel border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors shadow-sm"
                />
              </div>
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Database size={14} />
                TASC ERP Seed
              </div>
            </div>

            {loading && (
              <div className="flex items-center justify-center py-20 text-muted-foreground gap-2">
                <Loader2 size={18} className="animate-spin" /> Loading master data…
              </div>
            )}

            {error && !loading && (
              <div className="text-center py-20 text-danger">{error}</div>
            )}

            {!loading && !error && (
              <div className="bg-card border border-border/60 rounded-xl overflow-hidden shadow-sm">
                {activeTab === 'employees' && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-panel border-b border-border/50 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                        <tr>
                          <th className="px-6 py-4 font-medium">Emp ID</th>
                          <th className="px-6 py-4 font-medium">Name</th>
                          <th className="px-6 py-4 font-medium">Designation</th>
                          <th className="px-6 py-4 font-medium">Department</th>
                          <th className="px-6 py-4 font-medium">Client</th>
                          <th className="px-6 py-4 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/30">
                        {filteredEmployees.map((emp) => (
                          <tr key={emp.id} className="hover:bg-panel/50 transition-colors">
                            <td className="px-6 py-4 font-mono text-muted-foreground">{emp.employeeId}</td>
                            <td className="px-6 py-4 font-medium text-foreground">{emp.name}</td>
                            <td className="px-6 py-4 text-muted-foreground">{emp.designation || '—'}</td>
                            <td className="px-6 py-4 text-muted-foreground">{emp.department || '—'}</td>
                            <td className="px-6 py-4 text-foreground">
                              <div>{emp.client?.name || '—'}</div>
                              <div className="text-[10px] font-mono text-muted-foreground">{emp.client?.clientCode}</div>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-2 py-1 rounded text-[11px] font-mono uppercase tracking-widest border ${
                                  emp.isActive
                                    ? 'bg-success/10 text-success border-success/20'
                                    : 'bg-muted text-muted-foreground border-border/50'
                                }`}
                              >
                                {emp.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                          </tr>
                        ))}
                        {!filteredEmployees.length && (
                          <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                              No employees match your search.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'clients' && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-panel border-b border-border/50 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                        <tr>
                          <th className="px-6 py-4 font-medium">Code</th>
                          <th className="px-6 py-4 font-medium">Client Name</th>
                          <th className="px-6 py-4 font-medium">Industry</th>
                          <th className="px-6 py-4 font-medium">City</th>
                          <th className="px-6 py-4 font-medium">Employees</th>
                          <th className="px-6 py-4 font-medium">Currency</th>
                          <th className="px-6 py-4 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/30">
                        {filteredClients.map((client) => (
                          <tr key={client.id} className="hover:bg-panel/50 transition-colors">
                            <td className="px-6 py-4 font-mono text-muted-foreground">{client.clientCode}</td>
                            <td className="px-6 py-4 font-medium text-foreground">{client.name}</td>
                            <td className="px-6 py-4 text-muted-foreground">{client.industry || '—'}</td>
                            <td className="px-6 py-4 text-muted-foreground">{client.city || '—'}</td>
                            <td className="px-6 py-4 font-mono">{client._count?.employees ?? 0}</td>
                            <td className="px-6 py-4 font-mono">{client.currency}</td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-2 py-1 rounded text-[11px] font-mono uppercase tracking-widest border ${
                                  client.isActive
                                    ? 'bg-success/10 text-success border-success/20'
                                    : 'bg-muted text-muted-foreground border-border/50'
                                }`}
                              >
                                {client.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                          </tr>
                        ))}
                        {!filteredClients.length && (
                          <tr>
                            <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                              No clients match your search.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'rates' && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-panel border-b border-border/50 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                        <tr>
                          <th className="px-6 py-4 font-medium">Emp ID</th>
                          <th className="px-6 py-4 font-medium">Name</th>
                          <th className="px-6 py-4 font-medium">Role</th>
                          <th className="px-6 py-4 font-medium">Client</th>
                          <th className="px-6 py-4 font-medium">Hourly Rate</th>
                          <th className="px-6 py-4 font-medium">OT Rate</th>
                          <th className="px-6 py-4 font-medium">Period</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/30">
                        {rateRows.map((rate) => (
                          <tr key={rate.employeeId} className="hover:bg-panel/50 transition-colors">
                            <td className="px-6 py-4 font-mono text-muted-foreground">{rate.employeeId}</td>
                            <td className="px-6 py-4 font-medium text-foreground">{rate.name}</td>
                            <td className="px-6 py-4 text-muted-foreground">{rate.designation || '—'}</td>
                            <td className="px-6 py-4 text-foreground">{rate.clientName}</td>
                            <td className="px-6 py-4 font-mono font-medium text-primary">{rate.hourlyRate}</td>
                            <td className="px-6 py-4 font-mono text-muted-foreground">{rate.overtimeRate}</td>
                            <td className="px-6 py-4 text-muted-foreground">{rate.period}</td>
                          </tr>
                        ))}
                        {!rateRows.length && (
                          <tr>
                            <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                              No payroll rate data available.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
