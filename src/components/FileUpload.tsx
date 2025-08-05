import React, { useCallback } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
  error: string | null;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, isLoading, error }) => {
  const { isDarkMode } = useTheme();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileUpload(files[0]);
    }
  }, [onFileUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileUpload(files[0]);
    }
  }, [onFileUpload]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          isLoading 
            ? isDarkMode
              ? 'border-blue-600 bg-blue-900/20'
              : 'border-blue-300 bg-blue-50'
            : isDarkMode
              ? 'border-gray-600 hover:border-blue-500 hover:bg-blue-900/10'
              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-4">
          {isLoading ? (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          ) : (
            <Upload className={`w-12 h-12 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
          )}
          
          <div>
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
              {isLoading ? 'Processing file...' : 'Upload Testimonial Data'}
            </h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
              Drag and drop your Excel (.xlsx) or CSV file here, or click to browse
            </p>
            
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
              disabled={isLoading}
            />
            <label
              htmlFor="file-upload"
              className={`inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white transition-colors ${
                isLoading
                  ? isDarkMode
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gray-400 cursor-not-allowed'
                  : isDarkMode
                    ? 'bg-blue-700 hover:bg-blue-600 cursor-pointer'
                    : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
              }`}
            >
              <FileText className="w-5 h-5 mr-2" />
              Choose File
            </label>
          </div>
        </div>
      </div>

      {error && (
        <div className={`mt-4 p-4 rounded-lg border ${
          isDarkMode 
            ? 'bg-red-900/20 border-red-800' 
            : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <p className={`font-medium ${isDarkMode ? 'text-red-400' : 'text-red-700'}`}>Error</p>
          </div>
          <p className={`mt-1 ${isDarkMode ? 'text-red-300' : 'text-red-600'}`}>{error}</p>
        </div>
      )}

      <div className={`mt-6 rounded-lg p-4 ${
        isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50'
      }`}>
        <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
          Expected File Format:
        </h4>
        <div className={`text-sm space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <div className="flex items-center">
            <span className="font-medium w-24">name:</span>
            <span>Customer name (required)</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium w-24">rating:</span>
            <span>Rating 1-5 (required)</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium w-24">review:</span>
            <span>Review text (required)</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium w-24">photo_url:</span>
            <span>Profile image URL (optional)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;