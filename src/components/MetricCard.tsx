import { LucideIcon } from 'lucide-react';
import { cn } from './ui/utils';

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: LucideIcon;
  color?: string;
}

export function MetricCard({ title, value, change, changeType = 'neutral', icon: Icon, color }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="text-sm text-gray-600">{title}</div>
        {Icon && (
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center",
            color || "bg-gray-100"
          )}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        )}
      </div>
      <div className="text-3xl text-gray-900 mb-2">{value}</div>
      {change && (
        <div className={cn(
          "text-sm",
          changeType === 'positive' && "text-[#4CAF50]",
          changeType === 'negative' && "text-[#F44336]",
          changeType === 'neutral' && "text-gray-600"
        )}>
          {change}
        </div>
      )}
    </div>
  );
}
