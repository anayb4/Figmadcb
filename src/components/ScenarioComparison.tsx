import { useState } from 'react';
import { TrendingUp, DollarSign, Users, Leaf, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';

interface ScenarioComparisonProps {
  onSelectOption: () => void;
}

export function ScenarioComparison({ onSelectOption }: ScenarioComparisonProps) {
  const [selectedScenario, setSelectedScenario] = useState<string | null>('A');
  const [expandedScenario, setExpandedScenario] = useState<string | null>(null);
  const scenarios = [
    {
      id: 'A',
      name: 'Bus Rapid Transit',
      description: '12-mile BRT corridor with dedicated lanes',
      cost: '$42.3M',
      ridership: '+18%',
      emissions: '-14%',
      reliability: '+22%',
      details: {
        routes: '3 new BRT routes',
        stops: '24 stations',
        vehicles: '15 articulated buses',
        timeline: '18 months'
      }
    },
    {
      id: 'B',
      name: 'Light Rail Extension',
      description: '8-mile light rail extension to airport',
      cost: '$178.5M',
      ridership: '+32%',
      emissions: '-28%',
      reliability: '+35%',
      details: {
        routes: '1 new light rail line',
        stops: '12 stations',
        vehicles: '8 light rail cars',
        timeline: '36 months'
      }
    },
    {
      id: 'C',
      name: 'Enhanced Bus Network',
      description: 'Frequency improvements + signal priority',
      cost: '$8.7M',
      ridership: '+9%',
      emissions: '-6%',
      reliability: '+12%',
      details: {
        routes: '8 enhanced routes',
        stops: 'Existing infrastructure',
        vehicles: '12 new buses',
        timeline: '8 months'
      }
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900 mb-1">Scenario Comparison</h1>
          <p className="text-sm text-gray-600">Compare alternatives for 2025-2030 Transit Expansion Plan</p>
        </div>
        <div className="text-sm text-gray-600">
          Budget Available: <span className="text-lg text-[#4CAF50]">$50M</span>
        </div>
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {scenarios.map((scenario) => (
          <div 
            key={scenario.id} 
            className={`bg-white rounded-lg border-2 overflow-hidden transition-all cursor-pointer ${
              selectedScenario === scenario.id 
                ? 'border-[#4CAF50] shadow-lg' 
                : 'border-gray-200 hover:border-[#1E3A5F]'
            }`}
            onClick={() => setSelectedScenario(scenario.id)}
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-[#1E3A5F] to-[#2d5a8f] text-white p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm opacity-80">Scenario {scenario.id}</span>
                {scenario.id === 'A' && (
                  <span className="bg-[#4CAF50] text-white text-xs px-2 py-1 rounded">Recommended</span>
                )}
              </div>
              <h3 className="text-xl mb-2">{scenario.name}</h3>
              <p className="text-sm opacity-90">{scenario.description}</p>
            </div>

            {/* Key Metrics */}
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#1E3A5F]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-5 h-5 text-[#1E3A5F]" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Total Cost</div>
                  <div className="text-xl text-gray-900">{scenario.cost}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#4CAF50]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-[#4CAF50]" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Ridership Impact</div>
                  <div className="text-xl text-[#4CAF50]">{scenario.ridership}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#4CAF50]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-5 h-5 text-[#4CAF50]" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Emissions Reduction</div>
                  <div className="text-xl text-[#4CAF50]">{scenario.emissions}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#1E3A5F]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-[#1E3A5F]" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Reliability Improvement</div>
                  <div className="text-xl text-gray-900">{scenario.reliability}</div>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="px-6 pb-6">
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm text-gray-900 mb-2">Configuration</h4>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedScenario(expandedScenario === scenario.id ? null : scenario.id);
                    }}
                    className="text-xs text-[#1E3A5F] hover:underline"
                  >
                    {expandedScenario === scenario.id ? 'Less' : 'View Details'}
                  </button>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>• {scenario.details.routes}</div>
                  <div>• {scenario.details.stops}</div>
                  {expandedScenario === scenario.id && (
                    <>
                      <div>• {scenario.details.vehicles}</div>
                      <div>• {scenario.details.timeline} implementation</div>
                      <div className="pt-2 border-t border-gray-200 mt-2">
                        <div className="text-xs text-gray-900">Annual Operating Cost: $2.4M</div>
                        <div className="text-xs text-gray-900">Jobs Created: 45</div>
                        <div className="text-xs text-gray-900">Service Hours: 12,000/year</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="px-6 pb-6">
              <Button 
                className={`w-full ${
                  selectedScenario === scenario.id
                    ? 'bg-[#4CAF50] hover:bg-[#45a049]' 
                    : 'bg-[#1E3A5F] hover:bg-[#2d5a8f]'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedScenario(scenario.id);
                  onSelectOption();
                }}
              >
                {selectedScenario === scenario.id ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Select This Option
                  </>
                ) : (
                  'Select Option'
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 p-4">
          <h2 className="text-gray-900">Side-by-Side Comparison</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">Criteria</th>
                <th className="px-6 py-3 text-center text-xs text-gray-600 uppercase tracking-wider">Scenario A</th>
                <th className="px-6 py-3 text-center text-xs text-gray-600 uppercase tracking-wider">Scenario B</th>
                <th className="px-6 py-3 text-center text-xs text-gray-600 uppercase tracking-wider">Scenario C</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900">Capital Cost</td>
                <td className="px-6 py-4 text-sm text-center text-gray-900">$42.3M</td>
                <td className="px-6 py-4 text-sm text-center text-gray-900">$178.5M</td>
                <td className="px-6 py-4 text-sm text-center text-[#4CAF50]">$8.7M ✓</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">Annual Operating Cost</td>
                <td className="px-6 py-4 text-sm text-center text-gray-900">$4.2M</td>
                <td className="px-6 py-4 text-sm text-center text-gray-900">$6.8M</td>
                <td className="px-6 py-4 text-sm text-center text-[#4CAF50]">$2.1M ✓</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900">Ridership Increase</td>
                <td className="px-6 py-4 text-sm text-center text-gray-900">+18%</td>
                <td className="px-6 py-4 text-sm text-center text-[#4CAF50]">+32% ✓</td>
                <td className="px-6 py-4 text-sm text-center text-gray-900">+9%</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">CO₂ Reduction</td>
                <td className="px-6 py-4 text-sm text-center text-gray-900">-14%</td>
                <td className="px-6 py-4 text-sm text-center text-[#4CAF50]">-28% ✓</td>
                <td className="px-6 py-4 text-sm text-center text-gray-900">-6%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900">Implementation Timeline</td>
                <td className="px-6 py-4 text-sm text-center text-gray-900">18 months</td>
                <td className="px-6 py-4 text-sm text-center text-gray-900">36 months</td>
                <td className="px-6 py-4 text-sm text-center text-[#4CAF50]">8 months ✓</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">Benefit-Cost Ratio</td>
                <td className="px-6 py-4 text-sm text-center text-[#4CAF50]">2.8:1 ✓</td>
                <td className="px-6 py-4 text-sm text-center text-gray-900">1.9:1</td>
                <td className="px-6 py-4 text-sm text-center text-gray-900">2.2:1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Budget Summary */}
      <div className="bg-gradient-to-br from-[#1E3A5F] to-[#2d5a8f] text-white rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm opacity-80 mb-1">Total Budget</div>
            <div className="text-2xl">$50.0M</div>
          </div>
          <div>
            <div className="text-sm opacity-80 mb-1">Recommended Option (A)</div>
            <div className="text-2xl">$42.3M</div>
          </div>
          <div>
            <div className="text-sm opacity-80 mb-1">Budget Remaining</div>
            <div className="text-2xl text-[#4CAF50]">$7.7M</div>
          </div>
        </div>
      </div>
    </div>
  );
}
