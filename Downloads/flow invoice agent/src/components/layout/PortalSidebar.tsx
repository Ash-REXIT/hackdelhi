import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Home, 
  UploadCloud, 
  FileText, 
  CheckCircle, 
  MessageSquare, 
  Bell, 
  User,
  LogOut
} from 'lucide-react';

const PORTAL_NAV = [
  { icon: Home, label: 'Home', path: '/portal' },
  { icon: UploadCloud, label: 'Upload Timesheet', path: '/portal/upload' },
  { icon: FileText, label: 'My Invoices', path: '/portal/invoices' },
  { icon: CheckCircle, label: 'Approvals', path: '/portal/approvals' },
  { icon: MessageSquare, label: 'Messages', path: '/portal/messages' },
  { icon: Bell, label: 'Notifications', path: '/portal/notifications' },
  { icon: User, label: 'Account', path: '/portal/account' },
];

export function PortalSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-[#0B0F14] border-r border-[#2A3442] flex flex-col shrink-0 h-full">
      <div className="h-16 flex items-center px-6 border-b border-[#2A3442]/50 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-semibold text-sm shadow-sm">
            I
          </div>
          <span className="font-semibold text-[15px] text-foreground tracking-tight">Infosys Portal</span>
        </div>
      </div>
      
      <div className="flex-1 py-6 px-4 space-y-1">
        {PORTAL_NAV.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                isActive 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-muted-foreground hover:bg-[#151A21] hover:text-foreground'
              }`}
            >
              <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-[#2A3442]/50">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-[#151A21] hover:text-danger cursor-pointer transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-[#151A21] border border-[#2A3442] flex items-center justify-center text-muted-foreground group-hover:text-danger group-hover:border-danger/30 transition-colors">
            <LogOut size={14} />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-medium text-foreground group-hover:text-danger transition-colors">Sign Out</span>
            <span className="text-xs text-muted-foreground">John Doe</span>
          </div>
        </button>
      </div>
    </aside>
  );
}
