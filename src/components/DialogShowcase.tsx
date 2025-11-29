import { Upload, CheckCircle, Shield, DollarSign, Bike, Download, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

export function DialogShowcase() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl text-gray-900 mb-8 text-center">Dialog Components Showcase</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

        {/* 1. File Upload Dialog - Empty State */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-300">
          <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase">File Upload - Empty</h3>
          <div className="space-y-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Upload Network Data Files</h2>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Upload the required data files to generate a new network analysis.
              </p>

              {/* GPS.txt Upload */}
              <div className="space-y-2">
                <label className="text-sm text-gray-700">GPS.txt</label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept=".txt"
                    className="flex-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-[#1E3A5F] file:text-white hover:file:bg-[#2d5a8f] file:cursor-pointer"
                  />
                </div>
              </div>

              {/* crashes.txt Upload */}
              <div className="space-y-2">
                <label className="text-sm text-gray-700">crashes.txt</label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept=".txt"
                    className="flex-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-[#1E3A5F] file:text-white hover:file:bg-[#2d5a8f] file:cursor-pointer"
                  />
                </div>
              </div>

              {/* ST.txt Upload */}
              <div className="space-y-2">
                <label className="text-sm text-gray-700">ST.txt</label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept=".txt"
                    className="flex-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-[#1E3A5F] file:text-white hover:file:bg-[#2d5a8f] file:cursor-pointer"
                  />
                </div>
              </div>

              <Button
                disabled={true}
                className="w-full bg-[#1E3A5F] hover:bg-[#2d5a8f] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Upload className="mr-2 h-4 w-4" />
                Process Data
              </Button>
            </div>
          </div>
        </div>

        {/* 2. File Upload Dialog - Complete State */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-300">
          <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase">File Upload - Complete</h3>
          <div className="space-y-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Upload Network Data Files</h2>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Upload the required data files to generate a new network analysis.
              </p>

              {/* GPS.txt Upload */}
              <div className="space-y-2">
                <label className="text-sm text-gray-700">GPS.txt</label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept=".txt"
                    className="flex-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-[#1E3A5F] file:text-white hover:file:bg-[#2d5a8f] file:cursor-pointer"
                  />
                  <CheckCircle className="h-5 w-5 text-[#4CAF50]" />
                </div>
              </div>

              {/* crashes.txt Upload */}
              <div className="space-y-2">
                <label className="text-sm text-gray-700">crashes.txt</label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept=".txt"
                    className="flex-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-[#1E3A5F] file:text-white hover:file:bg-[#2d5a8f] file:cursor-pointer"
                  />
                  <CheckCircle className="h-5 w-5 text-[#4CAF50]" />
                </div>
              </div>

              {/* ST.txt Upload */}
              <div className="space-y-2">
                <label className="text-sm text-gray-700">ST.txt</label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept=".txt"
                    className="flex-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-[#1E3A5F] file:text-white hover:file:bg-[#2d5a8f] file:cursor-pointer"
                  />
                  <CheckCircle className="h-5 w-5 text-[#4CAF50]" />
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded p-3 flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-[#4CAF50] mt-0.5" />
                <div>
                  <p className="text-sm text-gray-900">All files uploaded successfully</p>
                  <p className="text-xs text-gray-600 mt-1">Click "Process Data" to generate your network analysis</p>
                </div>
              </div>

              <Button
                className="w-full bg-[#1E3A5F] hover:bg-[#2d5a8f]"
              >
                <Upload className="mr-2 h-4 w-4" />
                Process Data
              </Button>
            </div>
          </div>
        </div>

        {/* 3. Analyze Performance Dialog */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-300">
          <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase">Analyze Performance</h3>
          <div className="space-y-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Analysis Complete</h2>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-gray-700">
                Performance analysis for Route 44 - Main Street has been completed.
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
              <Button className="w-full bg-[#1E3A5F] hover:bg-[#2d5a8f]">
                View Results
              </Button>
            </div>
          </div>
        </div>

        {/* 4. Intersection Details Dialog */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-300">
          <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase">Intersection Details</h3>
          <div className="space-y-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Main St & 5th Ave</h2>
            </div>
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
          </div>
        </div>

        {/* 5. Drawing Tools Panel */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-300">
          <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase">Drawing Tools Panel</h3>
          <div className="space-y-2">
            <Button
              size="sm"
              variant="default"
              className="w-full justify-start"
            >
              <Bike className="w-4 h-4 mr-2" />
              Draw Lane (add 0.3 mi)
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="w-full justify-start"
            >
              Delete Last Segment
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="w-full justify-start text-red-600 hover:text-red-700"
            >
              Clear All
            </Button>
            <div className="pt-2 border-t border-gray-200 space-y-1">
              <div className="text-xs text-gray-600">Length segments: 0</div>
              <div className="text-xs text-gray-900">Added: +0.0 mi</div>
            </div>
          </div>
        </div>

        {/* 6. Route Details Popup */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-300">
          <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase">Route Details</h3>
          <div className="space-y-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Route 44 Details</h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Status</div>
                  <div className="text-lg text-[#1E3A5F]">Minor Delay</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Current Ridership</div>
                  <div className="text-lg text-gray-900">12,145</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">On-Time Performance</div>
                  <div className="text-lg text-gray-900">71%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Average Speed</div>
                  <div className="text-lg text-gray-900">18.7 mph</div>
                </div>
              </div>
              <Button className="w-full bg-[#1E3A5F] hover:bg-[#2d5a8f]">
                View Full Analysis
              </Button>
            </div>
          </div>
        </div>

        {/* 7. All Alerts Popup */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-300">
          <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase">All Alerts</h3>
          <div className="space-y-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">All Active Alerts</h2>
            </div>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              <div className="border-l-4 border-l-[#F44336] bg-red-50 p-4 rounded-r">
                <div className="flex items-start justify-between mb-1">
                  <span className="text-sm text-gray-900">Route 44 - Main St</span>
                  <span className="text-xs text-gray-500">12 min ago</span>
                </div>
                <p className="text-xs text-gray-700 mb-2">Traffic signal malfunction</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-xs h-7">Acknowledge</Button>
                  <Button size="sm" variant="outline" className="text-xs h-7">View Details</Button>
                </div>
              </div>
              <div className="border-l-4 border-l-[#F44336] bg-red-50 p-4 rounded-r">
                <div className="flex items-start justify-between mb-1">
                  <span className="text-sm text-gray-900">Route 7 - Broadway</span>
                  <span className="text-xs text-gray-500">2 hrs ago</span>
                </div>
                <p className="text-xs text-gray-700 mb-2">On-time performance below target</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-xs h-7">Acknowledge</Button>
                  <Button size="sm" variant="outline" className="text-xs h-7">View Details</Button>
                </div>
              </div>
              <div className="border-l-4 border-l-[#F44336] bg-red-50 p-4 rounded-r">
                <div className="flex items-start justify-between mb-1">
                  <span className="text-sm text-gray-900">Route 22 - Harbor Blvd</span>
                  <span className="text-xs text-gray-500">3 hrs ago</span>
                </div>
                <p className="text-xs text-gray-700 mb-2">Weather-related delays</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-xs h-7">Acknowledge</Button>
                  <Button size="sm" variant="outline" className="text-xs h-7">View Details</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 8. Design Options Panel */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-300">
          <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase">Design Options</h3>
          <div className="space-y-4">
            <h3 className="text-gray-900">Design Options</h3>
            <RadioGroup value="cycle-track">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <RadioGroupItem value="cycle-track" id="cycle-track-showcase" className="mt-1" />
                  <Label htmlFor="cycle-track-showcase" className="text-sm cursor-pointer">
                    <div className="text-gray-900">Cycle Track</div>
                    <div className="text-xs text-gray-600">Physically separated</div>
                  </Label>
                </div>
                <div className="flex items-start gap-2">
                  <RadioGroupItem value="parking-protected" id="parking-protected-showcase" className="mt-1" />
                  <Label htmlFor="parking-protected-showcase" className="text-sm cursor-pointer">
                    <div className="text-gray-900">Parking-Protected</div>
                    <div className="text-xs text-gray-600">Cars provide buffer</div>
                  </Label>
                </div>
                <div className="flex items-start gap-2">
                  <RadioGroupItem value="raised" id="raised-showcase" className="mt-1" />
                  <Label htmlFor="raised-showcase" className="text-sm cursor-pointer">
                    <div className="text-gray-900">Raised Lane</div>
                    <div className="text-xs text-gray-600">Elevated 4-6 inches</div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* 9. Safety Metrics Panel */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-300">
          <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase">Safety Metrics</h3>
          <div className="space-y-4">
            <h3 className="text-gray-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#4CAF50]" />
              Safety Metrics
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Crash Reduction</span>
                  <span className="text-lg text-[#4CAF50]">42%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#4CAF50]" style={{ width: '42%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Safety Score</span>
                  <span className="text-lg text-[#4CAF50]">87/100</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#4CAF50]" style={{ width: '87%' }}></div>
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
        </div>

        {/* 10. Cost Estimate Panel */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-300">
          <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase">Cost Estimate</h3>
          <div className="space-y-4">
            <h3 className="text-gray-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#1E3A5F]" />
              Cost Estimate
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Length</span>
                <span className="text-gray-900">2.4 miles</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Construction</span>
                <span className="text-gray-900">$486,000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Signage</span>
                <span className="text-gray-900">$24,000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Signals/Lighting</span>
                <span className="text-gray-900">$67,000</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                <span className="text-gray-900">Total Estimate</span>
                <span className="text-lg text-[#1E3A5F]">$577,000</span>
              </div>
              <div className="text-xs text-gray-600 mt-2">
                ≈ $240,417 per mile
              </div>
            </div>
          </div>
        </div>

        {/* 11. PDF Download Confirmation Dialog */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-300">
          <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase">PDF Download Confirmation</h3>
          <div className="space-y-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Report Download as PDF</h2>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-[#4CAF50]" />
                </div>
                <p className="text-sm text-gray-900 font-medium mb-1">Report Generated Successfully</p>
                <p className="text-xs text-gray-600 text-center">Your PDF report is ready to download</p>
              </div>

              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-[#F44336] mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-900 font-medium">Executive_Summary_Report.pdf</div>
                    <div className="text-xs text-gray-600 mt-0.5">2.4 MB • 5 pages</div>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-[#4CAF50] hover:bg-[#45a049]">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
