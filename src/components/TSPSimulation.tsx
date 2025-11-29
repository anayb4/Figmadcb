import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingDown, CheckCircle, FileDown } from 'lucide-react';
import { Button } from './ui/button';

export function TSPSimulation() {
  const comparisonData = [
    { name: 'Main & 5th', before: 4.2, after: 2.1 },
    { name: 'Main & Broadway', before: 3.8, after: 1.9 },
    { name: 'Main & Oak', before: 2.9, after: 1.5 },
    { name: 'Main & Center', before: 2.3, after: 1.2 },
  ];

  const improvements = [
    { intersection: 'Main St & 5th Ave', before: '4.2 min', after: '2.1 min', savings: '2.1 min', improvement: '50%' },
    { intersection: 'Main St & Broadway', before: '3.8 min', after: '1.9 min', savings: '1.9 min', improvement: '50%' },
    { intersection: 'Main St & Oak Ave', before: '2.9 min', after: '1.5 min', savings: '1.4 min', improvement: '48%' },
    { intersection: 'Main St & Center St', before: '2.3 min', after: '1.2 min', savings: '1.1 min', improvement: '48%' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900 mb-1">TSP Simulation Results</h1>
          <p className="text-sm text-gray-600">Route 44 - Main Street Corridor</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileDown className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          <Button className="bg-[#1E3A5F] hover:bg-[#2d5a8f]">
            Export PDF
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-[#4CAF50] to-[#45a049] text-white rounded-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5" />
            <span className="text-sm opacity-90">Travel Time Savings</span>
          </div>
          <div className="text-3xl mb-1">-3.2 min</div>
          <div className="text-sm opacity-90">12% improvement</div>
        </div>
        <div className="bg-gradient-to-br from-[#1E3A5F] to-[#2d5a8f] text-white rounded-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm opacity-90">Reliability Score</span>
          </div>
          <div className="text-3xl mb-1">85/100</div>
          <div className="text-sm opacity-90">+21 points</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="text-sm text-gray-600 mb-2">Implementation Cost</div>
          <div className="text-3xl text-gray-900 mb-1">$124K</div>
          <div className="text-sm text-gray-600">4 intersections</div>
        </div>
      </div>

      {/* Before/After Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-gray-900 mb-4">Average Delay Comparison</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="before" fill="#F44336" name="Before TSP" />
            <Bar dataKey="after" fill="#4CAF50" name="After TSP" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Intersection Details Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 p-4">
          <h2 className="text-gray-900">Intersection-by-Intersection Improvements</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Intersection</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Before</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">After</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Savings</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Improvement</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {improvements.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{item.intersection}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.before}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.after}</td>
                  <td className="px-6 py-4 text-sm text-[#4CAF50]">{item.savings}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-green-100 text-[#4CAF50]">
                      {item.improvement}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Additional Benefits</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Emissions Reduction</span>
              <span className="text-sm text-[#4CAF50]">-8.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Fuel Savings (annual)</span>
              <span className="text-sm text-[#4CAF50]">$47,300</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Passenger Time Saved (daily)</span>
              <span className="text-sm text-[#4CAF50]">142 hours</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">ROI Period</span>
              <span className="text-sm text-gray-900">2.6 years</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Implementation Timeline</h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-[#4CAF50] rounded-full"></div>
                <div className="w-0.5 h-full bg-gray-200"></div>
              </div>
              <div className="pb-4">
                <div className="text-sm text-gray-900">Planning & Design</div>
                <div className="text-xs text-gray-600">2-3 months</div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <div className="w-0.5 h-full bg-gray-200"></div>
              </div>
              <div className="pb-4">
                <div className="text-sm text-gray-900">Equipment Procurement</div>
                <div className="text-xs text-gray-600">1-2 months</div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              </div>
              <div>
                <div className="text-sm text-gray-900">Installation & Testing</div>
                <div className="text-xs text-gray-600">1 month</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
