import { FileText, FileSpreadsheet, Presentation, Download, Eye, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useState, useRef } from 'react';
import { toast } from 'sonner@2.0.3';

interface ReportGenerationProps {
  onBack?: () => void;
}

export function ReportGeneration({ onBack }: ReportGenerationProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [template, setTemplate] = useState('executive');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [sections, setSections] = useState({
    summary: true,
    metrics: true,
    maps: true,
    charts: true,
    recommendations: true,
    appendix: false
  });

  const templates = [
    {
      id: 'executive',
      name: 'Executive Summary',
      description: 'High-level overview for decision makers',
      pages: '4-6 pages'
    },
    {
      id: 'technical',
      name: 'Technical Report',
      description: 'Detailed analysis with methodology',
      pages: '15-20 pages'
    },
    {
      id: 'public',
      name: 'Public Presentation',
      description: 'Community-friendly format',
      pages: '8-10 slides'
    },
    {
      id: 'board',
      name: 'Board Briefing',
      description: 'Concise briefing for board meetings',
      pages: '2-3 pages'
    }
  ];

  const handlePreview = () => {
    previewRef.current?.scrollIntoView({ behavior: 'smooth' });
    toast.success('Report preview updated');
  };

  const handleDownload = () => {
    toast.success(`Report downloaded as ${exportFormat.toUpperCase()}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}
        <div>
          <h1 className="text-2xl text-gray-900 mb-1">Report Generation</h1>
          <p className="text-sm text-gray-600">Create professional reports and presentations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-1 space-y-4">
          {/* Template Selection */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-gray-900 mb-4">Select Template</h3>
            <RadioGroup value={template} onValueChange={setTemplate}>
              <div className="space-y-3">
                {templates.map((temp) => (
                  <div key={temp.id} className="flex items-start gap-2">
                    <RadioGroupItem value={temp.id} id={temp.id} className="mt-1" />
                    <Label htmlFor={temp.id} className="text-sm cursor-pointer flex-1">
                      <div className="text-gray-900">{temp.name}</div>
                      <div className="text-xs text-gray-600">{temp.description}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{temp.pages}</div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Sections to Include */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-gray-900 mb-4">Include Sections</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="summary" 
                  checked={sections.summary}
                  onCheckedChange={(checked) => setSections({...sections, summary: checked as boolean})}
                />
                <Label htmlFor="summary" className="text-sm cursor-pointer">Executive Summary</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="metrics" 
                  checked={sections.metrics}
                  onCheckedChange={(checked) => setSections({...sections, metrics: checked as boolean})}
                />
                <Label htmlFor="metrics" className="text-sm cursor-pointer">Key Metrics</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="maps" 
                  checked={sections.maps}
                  onCheckedChange={(checked) => setSections({...sections, maps: checked as boolean})}
                />
                <Label htmlFor="maps" className="text-sm cursor-pointer">Maps & Visualizations</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="charts" 
                  checked={sections.charts}
                  onCheckedChange={(checked) => setSections({...sections, charts: checked as boolean})}
                />
                <Label htmlFor="charts" className="text-sm cursor-pointer">Data Charts</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="recommendations" 
                  checked={sections.recommendations}
                  onCheckedChange={(checked) => setSections({...sections, recommendations: checked as boolean})}
                />
                <Label htmlFor="recommendations" className="text-sm cursor-pointer">Recommendations</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="appendix" 
                  checked={sections.appendix}
                  onCheckedChange={(checked) => setSections({...sections, appendix: checked as boolean})}
                />
                <Label htmlFor="appendix" className="text-sm cursor-pointer">Technical Appendix</Label>
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-gray-900 mb-4">Export Format</h3>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#F44336]" />
                    PDF Document
                  </div>
                </SelectItem>
                <SelectItem value="powerpoint">
                  <div className="flex items-center gap-2">
                    <Presentation className="w-4 h-4 text-[#FF9800]" />
                    PowerPoint
                  </div>
                </SelectItem>
                <SelectItem value="excel">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-[#4CAF50]" />
                    Excel Workbook
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button 
              className="w-full bg-[#1E3A5F] hover:bg-[#2d5a8f]"
              onClick={handlePreview}
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview Report
            </Button>
            <Button 
              className="w-full bg-[#4CAF50] hover:bg-[#45a049]"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4 mr-2" />
              Generate & Download
            </Button>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 p-4 flex items-center justify-between">
            <h2 className="text-gray-900">Report Preview</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Zoom In</Button>
              <Button variant="outline" size="sm">Zoom Out</Button>
            </div>
          </div>
          
          <div className="p-8 bg-gray-100 min-h-[800px]" ref={previewRef}>
            {/* Mock PDF Preview */}
            <div className="bg-white shadow-lg mx-auto max-w-3xl p-12 rounded">
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="w-16 h-16 bg-[#1E3A5F] rounded-lg flex items-center justify-center mb-3">
                    <span className="text-white text-2xl">MQ</span>
                  </div>
                  <h1 className="text-2xl text-gray-900 mb-1">MobilityIQ</h1>
                  <p className="text-sm text-gray-600">Transportation Planning Platform</p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <div>Report Date: Nov 18, 2025</div>
                  <div>Prepared by: Sarah Chen</div>
                </div>
              </div>

              {/* Title */}
              <div className="mb-8 pb-6 border-b-2 border-gray-200">
                <h2 className="text-3xl text-gray-900 mb-2">
                  {template === 'executive' && 'Executive Summary Report'}
                  {template === 'technical' && 'Technical Analysis Report'}
                  {template === 'public' && 'Public Presentation'}
                  {template === 'board' && 'Board Briefing Document'}
                </h2>
                <p className="text-lg text-gray-600">Route 44 Corridor Performance Analysis</p>
              </div>

              {/* Content Sections */}
              {sections.summary && (
                <div className="mb-6">
                  <h3 className="text-xl text-gray-900 mb-3">Executive Summary</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    Analysis of Route 44 (Main Street corridor) reveals significant performance challenges, with an average delay of 3.4 minutes and on-time performance of 71%. Implementation of Transit Signal Priority (TSP) is projected to reduce delays by 12% and improve reliability scores to 85/100.
                  </p>
                </div>
              )}

              {sections.metrics && (
                <div className="mb-6">
                  <h3 className="text-xl text-gray-900 mb-3">Key Performance Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="text-xs text-gray-600">On-Time Performance</div>
                      <div className="text-2xl text-gray-900">73%</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="text-xs text-gray-600">Daily Ridership</div>
                      <div className="text-2xl text-gray-900">45,231</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="text-xs text-gray-600">Average Delay</div>
                      <div className="text-2xl text-gray-900">3.4 min</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="text-xs text-gray-600">Reliability Score</div>
                      <div className="text-2xl text-gray-900">64/100</div>
                    </div>
                  </div>
                </div>
              )}

              {sections.maps && (
                <div className="mb-6">
                  <h3 className="text-xl text-gray-900 mb-3">Corridor Map</h3>
                  <div className="bg-gray-200 h-48 rounded flex items-center justify-center">
                    <span className="text-sm text-gray-600">[Map Visualization]</span>
                  </div>
                </div>
              )}

              {sections.recommendations && (
                <div className="mb-6">
                  <h3 className="text-xl text-gray-900 mb-3">Recommendations</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                    <li>Implement Transit Signal Priority at 4 key intersections ($124K)</li>
                    <li>Enhance real-time passenger information systems</li>
                    <li>Coordinate with traffic management center for signal timing</li>
                    <li>Monitor and evaluate performance quarterly</li>
                  </ol>
                </div>
              )}

              {/* Footer */}
              <div className="mt-12 pt-6 border-t border-gray-200 text-xs text-gray-500 text-center">
                Page 1 of {template === 'executive' ? '5' : template === 'technical' ? '18' : template === 'public' ? '10' : '3'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
