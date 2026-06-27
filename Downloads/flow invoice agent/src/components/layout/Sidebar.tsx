import { Link, useLocation } from 'react-router-dom';
import { 
  Briefcase, 
  CheckSquare, 
  FileText, 
  Users, 
  BookOpen, 
  BarChart3, 
  Settings 
} from 'lucide-react';

const NAV_ITEMS = [
  { icon: Briefcase, label: 'Workspace', path: '/' },
  { icon: CheckSquare, label: 'AI Review Queue', path: '/review' },
  { icon: FileText, label: 'Invoices', path: '/invoices' },
  { icon: Users, label: 'Clients', path: '/clients' },
  { icon: BookOpen, label: 'Knowledge', path: '/knowledge' },
  { icon: BarChart3, label: 'Reports', path: '/reports' },
];

export function Sidebar() {
  const location = useLocation();

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
          to="/settings"
          className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors group relative ${
            location.pathname === '/settings'
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:bg-card hover:text-foreground'
          }`}
        >
          <Settings size={20} strokeWidth={location.pathname === '/settings' ? 2.5 : 2} />
          <div className="absolute left-14 bg-card border border-border px-2 py-1 rounded text-xs font-medium text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
            Settings
          </div>
        </Link>
      </div>
    </aside>
  );
}
