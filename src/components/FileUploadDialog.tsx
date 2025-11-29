import { useState } from 'react';
import { Upload, FileText, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';

interface FileUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (files: { gps: string; crashes: string; st: string }) => void;
}

export function FileUploadDialog({ open, onOpenChange, onUpload }: FileUploadDialogProps) {
  const [gpsFile, setGpsFile] = useState<string>('');
  const [crashesFile, setCrashesFile] = useState<string>('');
  const [stFile, setStFile] = useState<string>('');

  const handleFileRead = (file: File, setter: (content: string) => void) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setter(e.target?.result as string);
    };
    reader.readAsText(file);
  };

  const handleUpload = () => {
    if (gpsFile && crashesFile && stFile) {
      onUpload({ gps: gpsFile, crashes: crashesFile, st: stFile });
      onOpenChange(false);
    }
  };

  const allFilesUploaded = gpsFile && crashesFile && stFile;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Network Data Files</DialogTitle>
        </DialogHeader>
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
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileRead(file, setGpsFile);
                }}
                className="flex-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-[#1E3A5F] file:text-white hover:file:bg-[#2d5a8f] file:cursor-pointer"
              />
              {gpsFile && <CheckCircle className="h-5 w-5 text-[#4CAF50]" />}
            </div>
          </div>

          {/* crashes.txt Upload */}
          <div className="space-y-2">
            <label className="text-sm text-gray-700">crashes.txt</label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept=".txt"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileRead(file, setCrashesFile);
                }}
                className="flex-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-[#1E3A5F] file:text-white hover:file:bg-[#2d5a8f] file:cursor-pointer"
              />
              {crashesFile && <CheckCircle className="h-5 w-5 text-[#4CAF50]" />}
            </div>
          </div>

          {/* ST.txt Upload */}
          <div className="space-y-2">
            <label className="text-sm text-gray-700">ST.txt</label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept=".txt"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileRead(file, setStFile);
                }}
                className="flex-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-[#1E3A5F] file:text-white hover:file:bg-[#2d5a8f] file:cursor-pointer"
              />
              {stFile && <CheckCircle className="h-5 w-5 text-[#4CAF50]" />}
            </div>
          </div>

          {allFilesUploaded && (
            <div className="bg-green-50 border border-green-200 rounded p-3 flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-[#4CAF50] mt-0.5" />
              <div>
                <p className="text-sm text-gray-900">All files uploaded successfully</p>
                <p className="text-xs text-gray-600 mt-1">Click "Process Data" to generate your network analysis</p>
              </div>
            </div>
          )}

          <Button
            onClick={handleUpload}
            disabled={!allFilesUploaded}
            className="w-full bg-[#1E3A5F] hover:bg-[#2d5a8f] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload className="mr-2 h-4 w-4" />
            Process Data
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
