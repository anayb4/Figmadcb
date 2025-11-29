import { useState } from 'react';
import { Clock, AlertCircle, Users, TrendingUp, X, Upload } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { FileUploadDialog } from './FileUploadDialog';
import { useNetwork } from '../context/NetworkContext';

export function MainDashboard() {
  const [mapView, setMapView] = useState('live');
  const [showRoutePopup, setShowRoutePopup] = useState<string | null>(null);
  const [showAllAlerts, setShowAllAlerts] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(true);
  const { currentNetwork, setUploadedNetwork } = useNetwork();

  const isUploadedNetwork = currentNetwork === 'uploaded';
  
  const alerts = [
    { id: 1, route: 'Route 44 - Main St', issue: 'Traffic signal malfunction', severity: 'high', time: '12 min ago' },
    { id: 3, route: 'Route 7 - Broadway', issue: 'On-time performance below target', severity: 'low', time: '2 hrs ago' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900 mb-1">Dashboard</h1>
          <p className="text-sm text-gray-600">Real-time overview of your transit network</p>
        </div>
        <Button
          onClick={() => setShowFileUpload(true)}
          className="bg-[#1E3A5F] hover:bg-[#2d5a8f]"
        >
          <Upload className="mr-2 h-4 w-4" />
          Input Files
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="On-Time Performance"
          value={isUploadedNetwork ? "68%" : "73%"}
          change={isUploadedNetwork ? undefined : "↓ 2% from last week"}
          changeType="negative"
          icon={Clock}
          color="bg-[#1E3A5F]"
        />
        <MetricCard
          title="Active Delays"
          value={isUploadedNetwork ? "18" : "12"}
          change={isUploadedNetwork ? undefined : "↑ 4 from yesterday"}
          changeType="negative"
          icon={AlertCircle}
          color="bg-[#F44336]"
        />
        <MetricCard
          title="Daily Ridership"
          value={isUploadedNetwork ? "38,942" : "45,231"}
          change={isUploadedNetwork ? undefined : "↑ 8% from last week"}
          changeType="positive"
          icon={Users}
          color="bg-[#4CAF50]"
        />
        <MetricCard
          title="Average Speed"
          value={isUploadedNetwork ? "16.8 mph" : "18.4 mph"}
          change={isUploadedNetwork ? undefined : "↑ 1.2 mph"}
          changeType="positive"
          icon={TrendingUp}
          color="bg-[#1E3A5F]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 p-4 flex items-center justify-between">
            <h2 className="text-gray-900">Network Overview</h2>
            <Tabs value={mapView} onValueChange={setMapView}>
              <TabsList>
                <TabsTrigger value="live">Live</TabsTrigger>
                <TabsTrigger value="routes">Routes</TabsTrigger>
                <TabsTrigger value="layers">Layers</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="relative h-96 bg-gray-100">
            {/* Map representation */}
            <svg className="w-full h-full" viewBox="0 0 800 400">
              {/* Background - map-like */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="800" height="400" fill="#f9fafb"/>
              <rect width="800" height="400" fill="url(#grid)"/>
              
              {/* Parks/green spaces */}
              <rect x="600" y="50" width="150" height="120" fill="#e8f5e9" opacity="0.6" rx="4"/>
              <rect x="50" y="280" width="120" height="100" fill="#e8f5e9" opacity="0.6" rx="4"/>
              
              {/* Major streets */}
              <g>
                <rect x="0" y="95" width="800" height="10" fill="#d1d5db"/>
                <rect x="0" y="195" width="800" height="10" fill="#d1d5db"/>
                <rect x="0" y="295" width="800" height="10" fill="#d1d5db"/>
                <rect x="145" y="0" width="10" height="400" fill="#d1d5db"/>
                <rect x="345" y="0" width="10" height="400" fill="#d1d5db"/>
                <rect x="545" y="0" width="10" height="400" fill="#d1d5db"/>
              </g>

              {/* Street labels */}
              <text x="10" y="90" className="text-xs" fill="#6b7280">5th Avenue</text>
              <text x="10" y="190" className="text-xs" fill="#6b7280">Main Street</text>
              <text x="10" y="290" className="text-xs" fill="#6b7280">Broadway</text>

              {/* Bus routes with realistic styling */}
              <g>
                {/* Route 7 - On time (green) */}
                <path d="M 50 200 L 145 200 M 155 200 L 250 200 L 250 100 M 250 90 L 250 70 L 345 70 M 355 70 L 545 70 M 555 70 L 600 70" 
                      stroke="#4CAF50" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.8"
                      className="cursor-pointer hover:opacity-100 transition-opacity"
                      onClick={() => setShowRoutePopup('7')}/>
                
                {/* Route 44 - Minor delay (blue) */}
                <path d="M 150 30 L 150 95 M 150 105 L 150 195 M 150 205 L 150 295 M 150 305 L 150 370" 
                      stroke="#1E3A5F" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.8"
                      className="cursor-pointer hover:opacity-100 transition-opacity"
                      onClick={() => setShowRoutePopup('44')}/>
                
                {/* Route 12 - Major delay (red, dashed) */}
                <path d="M 100 300 L 145 300 M 155 300 L 345 300 M 355 300 L 450 300 L 500 250 L 550 200 M 550 190 L 550 170 L 650 170" 
                      stroke="#F44336" strokeWidth="5" fill="none" strokeLinecap="round" strokeDasharray="12,6" opacity="0.8"
                      className="cursor-pointer hover:opacity-100 transition-opacity"
                      onClick={() => setShowRoutePopup('12')}/>
              </g>

              {/* Bus stops */}
              <g>
                <circle cx="150" cy="200" r="5" fill="white" stroke="#1E3A5F" strokeWidth="2.5"/>
                <circle cx="250" cy="100" r="5" fill="white" stroke="#4CAF50" strokeWidth="2.5"/>
                <circle cx="350" cy="200" r="5" fill="white" stroke="#1E3A5F" strokeWidth="2.5"/>
                <circle cx="550" cy="200" r="5" fill="white" stroke="#F44336" strokeWidth="2.5"/>
                <circle cx="350" cy="300" r="5" fill="white" stroke="#F44336" strokeWidth="2.5"/>
                <circle cx="150" cy="100" r="5" fill="white" stroke="#1E3A5F" strokeWidth="2.5"/>
              </g>

              {/* Route labels with background */}
              <g>
                <rect x="45" y="165" width="55" height="18" fill="white" opacity="0.9" rx="2"/>
                <text x="50" y="177" fill="#4CAF50" className="text-xs">Route 7</text>
                
                <rect x="160" y="25" width="60" height="18" fill="white" opacity="0.9" rx="2"/>
                <text x="165" y="37" fill="#1E3A5F" className="text-xs">Route 44</text>
                
                <rect x="450" y="280" width="60" height="18" fill="white" opacity="0.9" rx="2"/>
                <text x="455" y="292" fill="#F44336" className="text-xs">Route 12</text>
              </g>

              {/* Delay indicator */}
              <circle cx="550" cy="200" r="25" fill="#F44336" opacity="0.2"/>
              <circle cx="350" cy="300" r="20" fill="#F44336" opacity="0.2"/>
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 text-xs">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-1 bg-[#4CAF50] rounded"></div>
                <span>On-time</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-1 bg-[#1E3A5F] rounded"></div>
                <span>Minor delay</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-[#F44336] rounded"></div>
                <span>Major delay</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="bg-gray-50 border-b border-gray-200 p-4">
            <h2 className="text-gray-900">Recent Alerts</h2>
          </div>
          <div className="p-4 space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="border-l-4 border-l-[#F44336] bg-red-50 p-3 rounded-r">
                <div className="flex items-start justify-between mb-1">
                  <span className="text-sm text-gray-900">{alert.route}</span>
                  <span className="text-xs text-gray-500">{alert.time}</span>
                </div>
                <p className="text-xs text-gray-700">{alert.issue}</p>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-200">
            <Button 
              variant="outline" 
              className="w-full" 
              size="sm"
              onClick={() => setShowAllAlerts(true)}
            >
              View All Alerts
            </Button>
          </div>
        </div>
      </div>

      {/* Route Details Popup */}
      <Dialog open={showRoutePopup !== null} onOpenChange={() => setShowRoutePopup(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Route {showRoutePopup} Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Status</div>
                <div className="text-lg text-gray-900">
                  {showRoutePopup === '7' && <span className="text-[#4CAF50]">On-Time</span>}
                  {showRoutePopup === '44' && <span className="text-[#1E3A5F]">Minor Delay</span>}
                  {showRoutePopup === '12' && <span className="text-[#F44336]">Major Delay</span>}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Current Ridership</div>
                <div className="text-lg text-gray-900">
                  {showRoutePopup === '7' && '8,423'}
                  {showRoutePopup === '44' && '12,145'}
                  {showRoutePopup === '12' && '6,892'}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">On-Time Performance</div>
                <div className="text-lg text-gray-900">
                  {showRoutePopup === '7' && '94%'}
                  {showRoutePopup === '44' && '71%'}
                  {showRoutePopup === '12' && '58%'}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Average Speed</div>
                <div className="text-lg text-gray-900">
                  {showRoutePopup === '7' && '22.3 mph'}
                  {showRoutePopup === '44' && '18.7 mph'}
                  {showRoutePopup === '12' && '14.2 mph'}
                </div>
              </div>
            </div>
            <Button className="w-full bg-[#1E3A5F] hover:bg-[#2d5a8f]">
              View Full Analysis
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* All Alerts Dialog */}
      <Dialog open={showAllAlerts} onOpenChange={setShowAllAlerts}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>All Active Alerts</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {[...alerts, 
              { id: 4, route: 'Route 22 - Harbor Blvd', issue: 'Weather-related delays', severity: 'medium', time: '3 hrs ago' },
              { id: 5, route: 'Route 15 - River St', issue: 'Schedule adjustment needed', severity: 'low', time: '4 hrs ago' },
              { id: 6, route: 'Route 9 - Pine Ave', issue: 'Vehicle maintenance required', severity: 'high', time: '5 hrs ago' },
            ].map((alert) => (
              <div key={alert.id} className="border-l-4 border-l-[#F44336] bg-red-50 p-4 rounded-r">
                <div className="flex items-start justify-between mb-1">
                  <span className="text-sm text-gray-900">{alert.route}</span>
                  <span className="text-xs text-gray-500">{alert.time}</span>
                </div>
                <p className="text-xs text-gray-700 mb-2">{alert.issue}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-xs h-7">Acknowledge</Button>
                  <Button size="sm" variant="outline" className="text-xs h-7">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* File Upload Dialog */}
      <FileUploadDialog 
        open={showFileUpload} 
        onOpenChange={setShowFileUpload} 
        onUpload={setUploadedNetwork} 
      />
    </div>
  );
}