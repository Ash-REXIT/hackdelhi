import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Briefcase, 
  CheckSquare, 
  FileText, 
  Users, 
  BookOpen, 
  BarChart3, 
  Settings,
  LogOut
} from 'lucide-react';

const NAV_ITEMS = [
  { icon: Briefcase, label: 'Workspace', path: '/workspace' },
  { icon: CheckSquare, label: 'AI Review Queue', path: '/workspace/review' },
  { icon: FileText, label: 'Invoices', path: '/workspace/invoices' },
  { icon: Users, label: 'Clients', path: '/workspace/clients' },
  { icon: BookOpen, label: 'Knowledge', path: '/workspace/knowledge' },
  { icon: BarChart3, label: 'Reports', path: '/workspace/reports' },
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
    <aside className="w-[60px] bg-panel flex flex-col items-center py-4 shrink-0 justify-between">
      <div className="flex flex-col space-y-4 w-full items-center">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors group relative ${
                isActive 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-muted-foreground hover:bg-card hover:text-foreground'
              }`}
            >
              <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              
              {/* Tooltip on hover */}
              <div className="absolute left-14 bg-card border border-border px-2 py-1 rounded text-xs font-medium text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                {item.label}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex flex-col space-y-4 w-full items-center">
        <Link
          to="/workspace/settings"
          className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors group relative ${
            location.pathname === '/workspace/settings'
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:bg-card hover:text-foreground'
          }`}
        >
          <Settings size={20} strokeWidth={location.pathname === '/workspace/settings' ? 2.5 : 2} />
          <div className="absolute left-14 bg-card border border-border px-2 py-1 rounded text-xs font-medium text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
            Settings
          </div>
        </Link>
        <button
          onClick={handleLogout}
          className="w-10 h-10 flex items-center justify-center rounded-lg transition-colors group relative text-muted-foreground hover:bg-card hover:text-danger"
        >
          <LogOut size={20} strokeWidth={2} />
          <div className="absolute left-14 bg-card border border-border px-2 py-1 rounded text-xs font-medium text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
            Sign Out
          </div>
        </button>
      </div>
    </aside>
  );
}
