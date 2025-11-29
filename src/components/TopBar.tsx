import { Bell, Settings, User, Search, Database } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useNetwork } from '../context/NetworkContext';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

export function TopBar() {
  const { currentNetwork, hasUploadedNetwork, setCurrentNetwork } = useNetwork();

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <Search className="w-5 h-5 text-gray-400" />
        <Input 
          placeholder="Search routes, corridors, reports..." 
          className="border-none shadow-none focus-visible:ring-0"
        />
      </div>

      <div className="flex items-center gap-3">
        {hasUploadedNetwork && (
          <div className="flex items-center gap-2 mr-2 pr-2 border-r border-gray-200">
            <Database className="w-4 h-4 text-gray-500" />
            <Tabs value={currentNetwork} onValueChange={(value) => setCurrentNetwork(value as 'original' | 'uploaded')}>
              <TabsList className="h-8">
                <TabsTrigger value="original" className="text-xs">Original</TabsTrigger>
                <TabsTrigger value="uploaded" className="text-xs">Uploaded</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#F44336] rounded-full"></span>
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5 text-gray-600" />
        </Button>
        <div className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-200">
          <div className="w-8 h-8 bg-[#1E3A5F] rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="text-sm">
            <div className="text-gray-900">Sarah Chen</div>
            <div className="text-xs text-gray-500">City Planner</div>
          </div>
        </div>
      </div>
    </div>
  );
}