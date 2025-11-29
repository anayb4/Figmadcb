import { useState } from 'react';
import { Bike, Shield, DollarSign, MousePointer2 } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useNetwork } from '../context/NetworkContext';

interface BikeLaneDesignerProps {
  onGenerateReport: () => void;
}

export function BikeLaneDesigner({ onGenerateReport }: BikeLaneDesignerProps) {
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [laneType, setLaneType] = useState('cycle-track');
  const [drawMode, setDrawMode] = useState(false);
  const [mapTool, setMapTool] = useState('draw');
  const { currentNetwork } = useNetwork();

  const isUploadedNetwork = currentNetwork === 'uploaded';
  
  // Length segments state (each segment represents 0.3 miles)
  const [lengthSegments, setLengthSegments] = useState<Array<{ id: number; length: number; type: string }>>([]);
  const segmentLength = 0.3; // miles per segment

  const handleAddLengthSegment = () => {
    const newSegment = {
      id: Date.now(),
      length: segmentLength,
      type: laneType
    };
    setLengthSegments([...lengthSegments, newSegment]);
  };

  const handleDeleteLastSegment = () => {
    if (lengthSegments.length > 0) {
      setLengthSegments(lengthSegments.slice(0, -1));
    }
  };

  const handleClearAllSegments = () => {
    setLengthSegments([]);
  };

  // Calculate dynamic metrics based on length segments
  const totalLength = 2.4 + (lengthSegments.length * segmentLength);
  const crashReduction = Math.min(95, 42 + (lengthSegments.length * 8));
  const safetyScore = Math.min(100, 87 + (lengthSegments.length * 2));
  const constructionCost = Math.round(486 + (lengthSegments.length * 120));
  const signageCost = Math.round(24 + (lengthSegments.length * 8));
  const signalsLightingCost = Math.round(67 + (lengthSegments.length * 15));
  const totalCost = constructionCost + signageCost + signalsLightingCost;
  const costPerMile = Math.round(totalCost / totalLength);

  // Calculate visual representation - max corridor length is 6 miles
  const maxCorridorLength = 6.0; // miles
  const greenLaneWidth = (totalLength / maxCorridorLength) * 1000; // SVG width units

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl text-gray-900 mb-1">Bike Lane Designer</h1>
        <p className="text-sm text-gray-600">Design safe cycling infrastructure with data-driven insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map with Drawing Tools */}
        <div className="lg:col-span-3 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 p-4 flex items-center justify-between">
            <h2 className="text-gray-900">Oak Avenue - Mile 0.0 to 2.4</h2>
            <div className="flex gap-2">
              <Button 
                variant={mapTool === 'draw' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setMapTool('draw')}
              >
                <MousePointer2 className="w-4 h-4 mr-2" />
                Draw
              </Button>
              <Button 
                variant={mapTool === 'measure' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setMapTool('measure')}
              >
                Measure
              </Button>
              <Button 
                variant={mapTool === 'satellite' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setMapTool('satellite')}
              >
                Satellite
              </Button>
            </div>
          </div>
          
          <div className="relative h-[600px] bg-gray-100">
            {/* Street map with bike lane design */}
            <svg className="w-full h-full" viewBox="0 0 1000 600">
              {/* Background with grid */}
              <defs>
                <pattern id="bikeGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="1000" height="600" fill="#f9fafb"/>
              <rect width="1000" height="600" fill="url(#bikeGrid)"/>
              
              {/* Buildings along the street */}
              <g fill="#e5e7eb" opacity="0.4">
                <rect x="0" y="0" width="1000" height="230" rx="2"/>
                <rect x="0" y="420" width="1000" height="180" rx="2"/>
              </g>
              
              {/* Sidewalks */}
              <rect x="0" y="230" width="1000" height="20" fill="#d1d5db"/>
              <rect x="0" y="400" width="1000" height="20" fill="#d1d5db"/>
              
              {/* Street */}
              <rect x="0" y="250" width="1000" height="150" fill="#78909c"/>
              
              {/* Lane markings */}
              <g stroke="white" strokeWidth="2" strokeDasharray="15,10" opacity="0.8">
                <line x1="0" y1="300" x2="1000" y2="300"/>
              </g>
              <g stroke="#FFD700" strokeWidth="2">
                <line x1="0" y1="250" x2="1000" y2="250"/>
                <line x1="0" y1="400" x2="1000" y2="400"/>
              </g>
              
              {/* Crash heatmap overlay (if enabled) */}
              {showHeatmap && (
                <g>
                  <circle cx="300" cy="320" r="45" fill="#F44336" opacity="0.35"/>
                  <circle cx="500" cy="315" r="32" fill="#FF9800" opacity="0.3"/>
                  <circle cx="700" cy="325" r="55" fill="#F44336" opacity="0.4"/>
                  <circle cx="850" cy="310" r="28" fill="#FF9800" opacity="0.25"/>
                </g>
              )}
              
              {/* Proposed bike lane based on type */}
              {laneType === 'cycle-track' && (
                <>
                  {/* Grey unplanned portion */}
                  <rect x={greenLaneWidth} y="355" width={1000 - greenLaneWidth} height="35" fill="#9ca3af" opacity="0.4"/>
                  {/* Green planned portion */}
                  <rect x="0" y="355" width={greenLaneWidth} height="35" fill="#4CAF50" opacity="0.75"/>
                  <g stroke="white" strokeWidth="1.5" strokeDasharray="8,6">
                    <line x1="0" y1="355" x2="1000" y2="355"/>
                    <line x1="0" y1="390" x2="1000" y2="390"/>
                  </g>
                  {/* Bike symbols - only show in green section */}
                  {greenLaneWidth > 150 && (
                    <g fill="white" opacity="0.9">
                      <text x="180" y="380" className="text-2xl">🚴</text>
                    </g>
                  )}
                  {greenLaneWidth > 400 && (
                    <g fill="white" opacity="0.9">
                      <text x="450" y="380" className="text-2xl">🚴</text>
                    </g>
                  )}
                  {greenLaneWidth > 700 && (
                    <g fill="white" opacity="0.9">
                      <text x="750" y="380" className="text-2xl">🚴</text>
                    </g>
                  )}
                  {/* Barrier posts - only in green section */}
                  <g fill="#2e7d32">
                    {greenLaneWidth > 100 && <rect x="100" y="352" width="4" height="8" rx="1"/>}
                    {greenLaneWidth > 200 && <rect x="200" y="352" width="4" height="8" rx="1"/>}
                    {greenLaneWidth > 400 && <rect x="400" y="352" width="4" height="8" rx="1"/>}
                    {greenLaneWidth > 600 && <rect x="600" y="352" width="4" height="8" rx="1"/>}
                    {greenLaneWidth > 800 && <rect x="800" y="352" width="4" height="8" rx="1"/>}
                  </g>
                </>
              )}
              
              {laneType === 'parking-protected' && (
                <>
                  {/* Grey unplanned portion */}
                  <rect x={greenLaneWidth} y="350" width={1000 - greenLaneWidth} height="30" fill="#9ca3af" opacity="0.4"/>
                  {/* Green planned portion */}
                  <rect x="0" y="350" width={greenLaneWidth} height="30" fill="#4CAF50" opacity="0.75"/>
                  <g stroke="white" strokeWidth="1.5">
                    <line x1="0" y1="350" x2="1000" y2="350" strokeDasharray="8,6"/>
                    <line x1="0" y1="380" x2="1000" y2="380"/>
                  </g>
                  {/* Bike symbols - only show in green section */}
                  {greenLaneWidth > 150 && (
                    <g fill="white" opacity="0.9">
                      <text x="180" y="373" className="text-xl">🚴</text>
                    </g>
                  )}
                  {greenLaneWidth > 400 && (
                    <g fill="white" opacity="0.9">
                      <text x="450" y="373" className="text-xl">🚴</text>
                    </g>
                  )}
                  {greenLaneWidth > 700 && (
                    <g fill="white" opacity="0.9">
                      <text x="750" y="373" className="text-xl">🚴</text>
                    </g>
                  )}
                  {/* Parking spaces */}
                  <rect x="0" y="380" width="1000" height="20" fill="#6b7280" opacity="0.6"/>
                  <g stroke="white" strokeWidth="1" strokeDasharray="30,20">
                    <line x1="0" y1="385" x2="1000" y2="385"/>
                    <line x1="0" y1="395" x2="1000" y2="395"/>
                  </g>
                  {/* Parked cars - only in green section */}
                  <g fill="#455a64" opacity="0.7">
                    {greenLaneWidth > 180 && <rect x="120" y="382" width="60" height="16" rx="2"/>}
                    {greenLaneWidth > 480 && <rect x="420" y="382" width="60" height="16" rx="2"/>}
                    {greenLaneWidth > 780 && <rect x="720" y="382" width="60" height="16" rx="2"/>}
                  </g>
                </>
              )}
              
              {laneType === 'raised' && (
                <>
                  {/* Grey unplanned portion */}
                  <rect x={greenLaneWidth} y="353" width={1000 - greenLaneWidth} height="32" fill="#9ca3af" opacity="0.4"/>
                  {/* Green planned portion */}
                  <rect x="0" y="353" width={greenLaneWidth} height="32" fill="#4CAF50" opacity="0.8"/>
                  <rect x="0" y="350" width={greenLaneWidth} height="3" fill="#2e7d32"/>
                  <rect x="0" y="385" width={greenLaneWidth} height="3" fill="#2e7d32"/>
                  <g stroke="white" strokeWidth="1.5" strokeDasharray="8,6">
                    <line x1="0" y1="353" x2="1000" y2="353"/>
                  </g>
                  {/* Bike symbols - only show in green section */}
                  {greenLaneWidth > 150 && (
                    <g fill="white" opacity="0.9">
                      <text x="180" y="375" className="text-2xl">🚴</text>
                    </g>
                  )}
                  {greenLaneWidth > 400 && (
                    <g fill="white" opacity="0.9">
                      <text x="450" y="375" className="text-2xl">🚴</text>
                    </g>
                  )}
                  {greenLaneWidth > 700 && (
                    <g fill="white" opacity="0.9">
                      <text x="750" y="375" className="text-2xl">🚴</text>
                    </g>
                  )}
                </>
              )}
              
              {/* Intersections */}
              <g>
                <rect x="285" y="0" width="30" height="600" fill="#8d9ca6"/>
                <rect x="685" y="0" width="30" height="600" fill="#8d9ca6"/>
                {/* Crosswalk markings */}
                <g fill="white" opacity="0.9">
                  <rect x="290" y="260" width="5" height="130" />
                  <rect x="300" y="260" width="5" height="130" />
                  <rect x="310" y="260" width="5" height="130" />
                  <rect x="690" y="260" width="5" height="130" />
                  <rect x="700" y="260" width="5" height="130" />
                  <rect x="710" y="260" width="5" height="130" />
                </g>
              </g>
              
              {/* Crash location markers */}
              {showHeatmap && (
                <g>
                  <circle cx="300" cy="320" r="7" fill="#F44336" stroke="white" strokeWidth="2.5"/>
                  <circle cx="700" cy="325" r="7" fill="#F44336" stroke="white" strokeWidth="2.5"/>
                  <circle cx="500" cy="315" r="6" fill="#FF9800" stroke="white" strokeWidth="2"/>
                  <circle cx="850" cy="310" r="6" fill="#FF9800" stroke="white" strokeWidth="2"/>
                </g>
              )}

              {/* Street labels */}
              <g>
                <rect x="15" y="18" width="115" height="22" fill="white" opacity="0.95" rx="3"/>
                <text x="20" y="33" className="text-sm" fill="#374151">Oak Ave & 1st St</text>
                
                <rect x="275" y="18" width="135" height="22" fill="white" opacity="0.95" rx="3"/>
                <text x="280" y="33" className="text-sm" fill="#374151">Oak Ave & Main St</text>
                
                <rect x="675" y="18" width="130" height="22" fill="white" opacity="0.95" rx="3"/>
                <text x="680" y="33" className="text-sm" fill="#374151">Oak Ave & 5th St</text>
              </g>
            </svg>

            {/* Drawing Tools Panel */}
            {mapTool === 'draw' && (
              <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 space-y-2">
                <Button 
                  size="sm" 
                  variant="default"
                  className="w-full justify-start"
                  onClick={handleAddLengthSegment}
                >
                  <Bike className="w-4 h-4 mr-2" />
                  Draw Lane (add {segmentLength} mi)
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleDeleteLastSegment}
                  disabled={lengthSegments.length === 0}
                >
                  Delete Last Segment
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full justify-start text-red-600 hover:text-red-700"
                  onClick={handleClearAllSegments}
                  disabled={lengthSegments.length === 0}
                >
                  Clear All
                </Button>
                {lengthSegments.length > 0 && (
                  <div className="pt-2 border-t border-gray-200 space-y-1">
                    <div className="text-xs text-gray-600">Length segments: {lengthSegments.length}</div>
                    <div className="text-xs text-gray-900">Added: +{(lengthSegments.length * segmentLength).toFixed(1)} mi</div>
                  </div>
                )}
              </div>
            )}

            {/* Layer Toggle */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4">
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="heatmap" className="text-sm">Crash History Heatmap</Label>
                <Switch 
                  id="heatmap"
                  checked={showHeatmap} 
                  onCheckedChange={setShowHeatmap}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Design Options */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-gray-900 mb-4">Design Options</h3>
            <RadioGroup value={laneType} onValueChange={setLaneType}>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <RadioGroupItem value="cycle-track" id="cycle-track" className="mt-1" />
                  <Label htmlFor="cycle-track" className="text-sm cursor-pointer">
                    <div className="text-gray-900">Cycle Track</div>
                    <div className="text-xs text-gray-600">Physically separated</div>
                  </Label>
                </div>
                <div className="flex items-start gap-2">
                  <RadioGroupItem value="parking-protected" id="parking-protected" className="mt-1" />
                  <Label htmlFor="parking-protected" className="text-sm cursor-pointer">
                    <div className="text-gray-900">Parking-Protected</div>
                    <div className="text-xs text-gray-600">Cars provide buffer</div>
                  </Label>
                </div>
                <div className="flex items-start gap-2">
                  <RadioGroupItem value="raised" id="raised" className="mt-1" />
                  <Label htmlFor="raised" className="text-sm cursor-pointer">
                    <div className="text-gray-900">Raised Lane</div>
                    <div className="text-xs text-gray-600">Elevated 4-6 inches</div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Safety Metrics */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#4CAF50]" />
              Safety Metrics
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Crash Reduction</span>
                  <span className="text-lg text-[#4CAF50]">{crashReduction}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#4CAF50]" style={{ width: `${crashReduction}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Safety Score</span>
                  <span className="text-lg text-[#4CAF50]">{safetyScore}/100</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#4CAF50]" style={{ width: `${safetyScore}%` }}></div>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <div className="text-xs text-gray-600 mb-1">Based on:</div>
                <div className="text-xs text-gray-900">• 5 years crash data</div>
                <div className="text-xs text-gray-900">• FHWA safety factors</div>
                <div className="text-xs text-gray-900">• Local traffic patterns</div>
              </div>
            </div>
          </div>

          {/* Cost Calculator */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#1E3A5F]" />
              Cost Estimate
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Length</span>
                <span className="text-gray-900">{totalLength.toFixed(1)} miles</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Construction</span>
                <span className="text-gray-900">${constructionCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Signage</span>
                <span className="text-gray-900">${signageCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Signals/Lighting</span>
                <span className="text-gray-900">${signalsLightingCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                <span className="text-gray-900">Total Estimate</span>
                <span className="text-lg text-[#1E3A5F]">${totalCost.toLocaleString()}</span>
              </div>
              <div className="text-xs text-gray-600 mt-2">
                ≈ ${costPerMile.toLocaleString()} per mile
              </div>
            </div>
          </div>

          <Button 
            className="w-full bg-[#4CAF50] hover:bg-[#45a049]"
            onClick={onGenerateReport}
          >
            Generate Design Report
          </Button>
        </div>
      </div>
    </div>
  );
}