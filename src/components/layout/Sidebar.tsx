import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Inbox, 
  ScanLine, 
  ShieldCheck, 
  ListTodo, 
  Network, 
  Send, 
  Building2, 
  Scale, 
  Database, 
  BarChart3, 
  BookOpen,
  Settings,
  LogOut
} from 'lucide-react';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'FinOps Dashboard', path: '/workspace' },
  { icon: Inbox, label: 'Timesheet Inbox', path: '/workspace/inbox' },
  { icon: ScanLine, label: 'AI Extraction', path: '/workspace/extraction' },
  { icon: ShieldCheck, label: 'Validation Center', path: '/workspace/validation' },
  { icon: ListTodo, label: 'Review Queue', path: '/workspace/review' },
  { icon: Network, label: 'ERP Queue', path: '/workspace/erp' },
  { icon: Send, label: 'Dispatch Center', path: '/workspace/dispatch' },
  { icon: Building2, label: 'Clients', path: '/workspace/clients' },
  { icon: Scale, label: 'Business Rules', path: '/workspace/rules' },
  { icon: Database, label: 'Master Data', path: '/workspace/master-data' },
  { icon: BarChart3, label: 'Analytics', path: '/workspace/analytics' },
  { icon: BookOpen, label: 'Knowledge Base', path: '/workspace/knowledge' },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-[60px] bg-panel flex flex-col items-center py-4 shrink-0 border-r border-[#2A3442]/50 justify-between">
      <div className="flex flex-col space-y-2 w-full items-center">
        {/* Logo Placeholder */}
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4 border border-primary/20">
          <span className="font-bold text-sm">FA</span>
        </div>

        {/* Primary Navigation */}
        <nav className="flex flex-col space-y-1 w-full items-center">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path || 
                             (item.path !== '/workspace' && location.pathname.startsWith(item.path));
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors group relative ${
                  isActive
                    ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm'
                    : 'text-muted-foreground hover:bg-[#151A21] hover:text-foreground'
                }`}
              >
                <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                <div className="absolute left-14 bg-[#1D2430] border border-[#2A3442] px-2.5 py-1.5 rounded-md text-xs font-medium text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col space-y-2 w-full items-center mt-4 pt-4 border-t border-[#2A3442]/50">
        <Link
          to="/workspace/settings"
          className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors group relative ${
            location.pathname === '/workspace/settings'
              ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm'
              : 'text-muted-foreground hover:bg-[#151A21] hover:text-foreground'
          }`}
        >
          <Settings size={18} strokeWidth={location.pathname === '/workspace/settings' ? 2.5 : 2} />
          <div className="absolute left-14 bg-[#1D2430] border border-[#2A3442] px-2.5 py-1.5 rounded-md text-xs font-medium text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
            Settings
          </div>
        </Link>
        <button
          onClick={handleLogout}
          className="w-10 h-10 flex items-center justify-center rounded-lg transition-colors group relative text-muted-foreground hover:bg-[#151A21] hover:text-danger"
        >
          <LogOut size={18} strokeWidth={2} />
          <div className="absolute left-14 bg-[#1D2430] border border-[#2A3442] px-2.5 py-1.5 rounded-md text-xs font-medium text-danger whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
            Sign Out
          </div>
        </button>
      </div>
    </aside>
  );
}
