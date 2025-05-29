import React, { useRef, useState } from 'react';
import { useMutation } from 'react-query';
import api from '../../utils/api';
import { Upload, File, AlertCircle } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export function FileUpload({ children, onSuccess }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const { toast } = useToast();
  
  const uploadMutation = useMutation(
    async (formData) => {
      const response = await api.post('/data/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        setSelectedFile(null);
        toast({
          title: 'File uploaded successfully',
          description: `${data.count} records have been processed.`,
          variant: 'success',
        });
        if (onSuccess) {
          onSuccess(data);
        }
      },
      onError: (error) => {
        toast({
          title: 'Upload failed',
          description: error.response?.data?.message || error.message,
          variant: 'destructive',
        });
      },
    }
  );
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  
  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        title: 'No file selected',
        description: 'Please select a file to upload.',
        variant: 'destructive',
      });
      return;
    }
    
    const formData = new FormData();
    formData.append('file', selectedFile);
    uploadMutation.mutate(formData);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          isDragging ? 'border-[#1a1a2e] bg-blue-50' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center">
          <Upload className="h-12 w-12 text-gray-400 mb-4" />
          
          <h3 className="text-lg font-medium mb-2">
            {selectedFile ? `Selected: ${selectedFile.name}` : 'Drag & Drop your file here'}
          </h3>
          
          <p className="text-sm text-gray-500 mb-4">
            {selectedFile 
              ? `${(selectedFile.size / 1024).toFixed(2)} KB - ${selectedFile.type}` 
              : 'Supports CSV, Excel, and JSON formats'}
          </p>
          
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50"
            >
              Browse Files
            </button>
            
            {selectedFile && (
              <button
                type="button"
                onClick={handleUpload}
                className="px-4 py-2 bg-[#1a1a2e] text-white rounded-md text-sm hover:bg-opacity-90"
                disabled={uploadMutation.isLoading}
              >
                {uploadMutation.isLoading ? 'Uploading...' : 'Upload File'}
              </button>
            )}
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept=".csv,.xlsx,.xls,.json"
          />
        </div>
        
        {uploadMutation.isError && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Upload failed</p>
              <p className="text-sm">
                {uploadMutation.error?.response?.data?.message || uploadMutation.error?.message}
              </p>
            </div>
          </div>
        )}
      </div>
      
      {children}
    </div>
  );
}