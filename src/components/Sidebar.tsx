import { Home, TrendingUp, Bike, GitCompare, FileText, LucideIcon } from 'lucide-react';
import { cn } from './ui/utils';

interface SidebarProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'corridor', label: 'Corridor Analysis', icon: TrendingUp },
  { id: 'bike', label: 'Bike Infrastructure', icon: Bike },
  { id: 'scenario', label: 'Scenario Planning', icon: GitCompare },
  { id: 'reports', label: 'Reports', icon: FileText },
];

export function Sidebar({ activeScreen, onNavigate }: SidebarProps) {
  return (
    <div className="w-64 bg-[#1E3A5F] text-white flex flex-col h-full">
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
          <span className="text-[#1E3A5F] text-xl">MQ</span>
        </div>
        <div>
          <h1 className="text-lg">MobilityIQ</h1>
          <p className="text-xs text-white/60">v2.4.1</p>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                    isActive 
                      ? "bg-white/20 text-white" 
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="bg-white/10 rounded-lg p-4">
          <p className="text-xs text-white/80 mb-2">Need help?</p>
          <button className="text-xs text-white hover:underline">
            View Documentation →
          </button>
        </div>
      </div>
    </div>
  );
}
