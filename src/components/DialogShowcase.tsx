import { Upload, CheckCircle, Shield, DollarSign, Bike, Download, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

export function DialogShowcase() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
      <div className="max-w-md w-full">

        {/* PDF Download Confirmation Dialog */}
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
