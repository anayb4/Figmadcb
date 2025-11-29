import { useState } from 'react';
import { Calendar, MapPin, TrendingDown } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar as CalendarComponent } from './ui/calendar';
import { useNetwork } from '../context/NetworkContext';

interface CorridorAnalysisProps {
  onShowScenario: () => void;
}

export function CorridorAnalysis({ onShowScenario }: CorridorAnalysisProps) {
  const [selectedRoute, setSelectedRoute] = useState('route-44');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [selectedIntersection, setSelectedIntersection] = useState<string | null>(null);
  const [highlightedLocation, setHighlightedLocation] = useState<number | null>(null);
  const [dateRange, setDateRange] = useState<Date | undefined>(new Date());
  const { currentNetwork } = useNetwork();

  const isUploadedNetwork = currentNetwork === 'uploaded';

  const topDelayLocations = isUploadedNetwork ? [
    { location: 'Peachtree St & 10th', avgDelay: '5.8 min', frequency: 'High' },
    { location: 'Monroe Dr & Virginia', avgDelay: '4.5 min', frequency: 'High' },
    { location: 'Buford Hwy & Clairmont', avgDelay: '3.7 min', frequency: 'High' },
    { location: 'Ponce de Leon & Highland', avgDelay: '3.1 min', frequency: 'Medium' },
  ] : [
    { location: 'Main St & 5th Ave', avgDelay: '4.2 min', frequency: 'High' },
    { location: 'Broadway & Park', avgDelay: '3.8 min', frequency: 'High' },
    { location: '2nd St & Oak Ave', avgDelay: '2.9 min', frequency: 'Medium' },
    { location: 'Center St & Elm', avgDelay: '2.3 min', frequency: 'Medium' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl text-gray-900 mb-1">Corridor Analysis</h1>
        <p className="text-sm text-gray-600">Analyze performance and identify bottlenecks</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Route / Corridor</label>
            <Select value={selectedRoute} onValueChange={setSelectedRoute}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="route-44">Route 44 - Main Street</SelectItem>
                <SelectItem value="route-39">Route 39 - Buford Highway</SelectItem>
                <SelectItem value="route-12">Route 12 - Oak Avenue</SelectItem>
                <SelectItem value="route-7">Route 7 - Broadway</SelectItem>
                <SelectItem value="route-22">Route 22 - Harbor Blvd</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Date Range</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-sm">Last 30 Days</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={dateRange}
                  onSelect={setDateRange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-end">
            <Button 
              className="w-full bg-[#1E3A5F] hover:bg-[#2d5a8f]"
              onClick={() => setShowAnalysis(true)}
            >
              Analyze Performance
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 p-4">
            <h2 className="text-gray-900">
              {selectedRoute === 'route-39' ? 'Route 39 - Buford Highway Delay Heatmap' : 'Route 44 - Main Street Delay Heatmap'}
            </h2>
          </div>
          <div className="relative h-[500px] bg-gray-100">
            {/* Corridor map with color-coded delays */}
            <svg className="w-full h-full" viewBox="0 0 800 500">
              {/* Background with subtle grid */}
              <defs>
                <pattern id="corridorGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="800" height="500" fill="#f9fafb"/>
              <rect width="800" height="500" fill="url(#corridorGrid)"/>
              
              {/* Buildings/blocks */}
              <g fill="#e5e7eb" opacity="0.4">
                <rect x="20" y="20" width="60" height="110" rx="2"/>
                <rect x="120" y="20" width="250" height="110" rx="2"/>
                <rect x="420" y="20" width="180" height="110" rx="2"/>
                <rect x="20" y="170" width="60" height="60" rx="2"/>
                <rect x="120" y="170" width="250" height="60" rx="2"/>
                <rect x="420" y="170" width="180" height="60" rx="2"/>
                <rect x="20" y="270" width="60" height="60" rx="2"/>
                <rect x="120" y="270" width="250" height="60" rx="2"/>
                <rect x="420" y="270" width="180" height="60" rx="2"/>
                <rect x="20" y="370" width="60" height="110" rx="2"/>
                <rect x="120" y="370" width="250" height="110" rx="2"/>
                <rect x="420" y="370" width="180" height="110" rx="2"/>
              </g>
              
              {/* Cross streets */}
              <g>
                <rect x="0" y="145" width="800" height="10" fill="#d1d5db"/>
                <rect x="0" y="245" width="800" height="10" fill="#d1d5db"/>
                <rect x="0" y="345" width="800" height="10" fill="#d1d5db"/>
                <rect x="395" y="0" width="10" height="500" fill="#d1d5db"/>
                <rect x="695" y="0" width="10" height="500" fill="#d1d5db"/>
              </g>

              {/* Main Street corridor */}
              <rect x="85" y="0" width="30" height="500" fill="#b0bec5"/>

              {/* Main corridor segments - color coded by delay severity */}
              <g>
                {/* Severe delay segment (top) */}
                <rect x="88" y="0" width="24" height="150" fill="#F44336" opacity="0.7"/>
                <circle cx="100" cy="150" r="28" fill="#F44336" opacity="0.25"/>
                
                {/* Moderate delay segment */}
                <rect x="88" y="150" width="24" height="100" fill="#FF9800" opacity="0.7"/>
                <circle cx="100" cy="250" r="22" fill="#FF9800" opacity="0.25"/>
                
                {/* Light delay segment */}
                <rect x="88" y="250" width="24" height="100" fill="#FFC107" opacity="0.7"/>
                <circle cx="100" cy="350" r="18" fill="#FFC107" opacity="0.25"/>
                
                {/* Good performance segment (bottom) */}
                <rect x="88" y="350" width="24" height="150" fill="#4CAF50" opacity="0.7"/>
              </g>

              {/* Intersection markers */}
              <g>
                <circle 
                  cx="100" cy="150" r="7" 
                  fill={highlightedLocation === 0 ? "#F44336" : "white"} 
                  stroke="#F44336" strokeWidth="3"
                  className="cursor-pointer hover:r-9 transition-all"
                  onClick={() => setSelectedIntersection('Main & 5th')}
                />
                <circle 
                  cx="100" cy="250" r="7" 
                  fill={highlightedLocation === 1 ? "#FF9800" : "white"} 
                  stroke="#FF9800" strokeWidth="3"
                  className="cursor-pointer hover:r-9 transition-all"
                  onClick={() => setSelectedIntersection('Main & Broadway')}
                />
                <circle 
                  cx="100" cy="350" r="7" 
                  fill={highlightedLocation === 2 ? "#FFC107" : "white"} 
                  stroke="#FFC107" strokeWidth="3"
                  className="cursor-pointer hover:r-9 transition-all"
                  onClick={() => setSelectedIntersection('Main & Oak')}
                />
              </g>

              {/* Street name labels */}
              <g>
                <rect x="118" y="142" width="180" height="20" fill="white" opacity="0.95" rx="3"/>
                <text x="125" y="156" className="text-sm" fill="#374151">Main & 5th Ave (4.2 min)</text>
                
                <rect x="118" y="242" width="210" height="20" fill="white" opacity="0.95" rx="3"/>
                <text x="125" y="256" className="text-sm" fill="#374151">Main & Broadway (3.8 min)</text>
                
                <rect x="118" y="342" width="190" height="20" fill="white" opacity="0.95" rx="3"/>
                <text x="125" y="356" className="text-sm" fill="#374151">Main & Oak Ave (2.9 min)</text>
              </g>

              {/* Direction arrow */}
              <g fill="#6b7280">
                <polygon points="100,30 95,45 105,45"/>
                <text x="80" y="25" className="text-xs" fill="#6b7280">North</text>
              </g>

              {/* Legend background */}
              <rect x="600" y="20" width="180" height="140" fill="white" stroke="#d1d5db" strokeWidth="1" rx="4"/>
              
              {/* Legend */}
              <text x="615" y="40" className="text-xs" fill="#374151">Avg Delay</text>
              <line x1="615" y1="55" x2="645" y2="55" stroke="#4CAF50" strokeWidth="6"/>
              <text x="655" y="60" className="text-xs" fill="#374151">{'< 1 min'}</text>
              
              <line x1="615" y1="75" x2="645" y2="75" stroke="#FFC107" strokeWidth="6"/>
              <text x="655" y="80" className="text-xs" fill="#374151">1-3 min</text>
              
              <line x1="615" y1="95" x2="645" y2="95" stroke="#FF9800" strokeWidth="6"/>
              <text x="655" y="100" className="text-xs" fill="#374151">3-5 min</text>
              
              <line x1="615" y1="115" x2="645" y2="115" stroke="#F44336" strokeWidth="6"/>
              <text x="655" y="120" className="text-xs" fill="#374151">{'> 5 min'}</text>
            </svg>

            <div className="absolute top-4 left-4">
              <Button size="sm" variant="outline" className="bg-white">
                Toggle Layers
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* Delay Statistics */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-gray-900 mb-4">Delay Statistics</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Average Delay</span>
                  <span className="text-gray-900">3.4 min</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#F44336] w-[68%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Schedule Adherence</span>
                  <span className="text-gray-900">71%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FF9800] w-[71%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Reliability Score</span>
                  <span className="text-gray-900">64/100</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#F44336] w-[64%]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Delay Locations */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-gray-900 mb-4 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-[#F44336]" />
              Top Delay Locations
            </h3>
            <div className="space-y-3">
              {topDelayLocations.map((loc, idx) => (
                <div 
                  key={idx} 
                  className={`border-l-4 border-l-[#F44336] pl-3 py-2 rounded-r cursor-pointer transition-all ${
                    highlightedLocation === idx ? 'bg-red-100' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    setHighlightedLocation(idx);
                    setSelectedIntersection(loc.location);
                  }}
                >
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-900 truncate">{loc.location}</div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-600">{loc.avgDelay} avg</span>
                        <span className="text-xs text-[#F44336]">{loc.frequency}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <Button 
            className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white"
            onClick={onShowScenario}
          >
            Simulate TSP Solution
          </Button>
        </div>
      </div>

      {/* Intersection Details Dialog */}
      <Dialog open={selectedIntersection !== null} onOpenChange={() => setSelectedIntersection(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedIntersection}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-50 p-3 rounded">
                <div className="text-xs text-gray-600 mb-1">Average Delay</div>
                <div className="text-2xl text-[#F44336]">4.2 min</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-xs text-gray-600 mb-1">Delay Frequency</div>
                <div className="text-2xl text-gray-900">High</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-xs text-gray-600 mb-1">Peak Hour Impact</div>
                <div className="text-2xl text-gray-900">6.8 min</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-xs text-gray-600 mb-1">Signal Cycle</div>
                <div className="text-2xl text-gray-900">120s</div>
              </div>
            </div>
            <div className="border-t pt-4">
              <h4 className="text-sm text-gray-900 mb-2">Recommendations</h4>
              <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li>Install Transit Signal Priority (TSP)</li>
                <li>Optimize signal timing for peak hours</li>
                <li>Add queue jump lane</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Analysis Complete Notification */}
      {showAnalysis && (
        <Dialog open={showAnalysis} onOpenChange={setShowAnalysis}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Analysis Complete</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-gray-700">
                Performance analysis for {selectedRoute === 'route-39' ? 'Route 39 - Buford Highway' : 'Route 44 - Main Street'} has been completed.
              </p>
              <div className="bg-gray-50 p-4 rounded">
                <div className="text-sm text-gray-600 mb-2">Key Findings:</div>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>4 major delay locations identified</li>
                  <li>Average delay: 3.4 minutes</li>
                  <li>On-time performance: 71%</li>
                  <li>Potential improvement: 12% with TSP</li>
                </ul>
              </div>
              <Button 
                className="w-full bg-[#1E3A5F] hover:bg-[#2d5a8f]"
                onClick={() => setShowAnalysis(false)}
              >
                View Results
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}