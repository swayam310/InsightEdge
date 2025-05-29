import React, { useState } from 'react';
import { useMutation } from 'react-query';
import api from '../utils/api';
import { Sidebar } from '../components/layout/Sidebar';
import { TopNav } from '../components/layout/TopNav';
import { FileUpload } from '../components/ui/FileUpload';
import { Upload, Plus, Trash2 } from 'lucide-react';
import { useToast } from '../hooks/useToast';

export default function UploadPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [manualData, setManualData] = useState([
    { id: Date.now(), date: '', product: '', quantity: '', price: '', total: '' }
  ]);
  const { toast } = useToast();
  
  const saveManualDataMutation = useMutation(
    async (data) => {
      const response = await api.post('/data/manual', { data });
      return response.data;
    },
    {
      onSuccess: (data) => {
        toast({
          title: 'Data saved successfully',
          description: `${data.count} records have been saved.`,
          variant: 'success',
        });
        // Reset form after successful submission
        setManualData([{ id: Date.now(), date: '', product: '', quantity: '', price: '', total: '' }]);
      },
      onError: (error) => {
        toast({
          title: 'Error saving data',
          description: error.response?.data?.message || error.message,
          variant: 'destructive',
        });
      }
    }
  );
  
  const handleMenuClick = () => {
    setIsMobileOpen(true);
  };
  
  const handleFileUploadSuccess = (data) => {
    toast({
      title: 'File uploaded successfully',
      description: `${data.count} records have been processed from ${data.filename}.`,
      variant: 'success',
    });
  };
  
  const handleInputChange = (id, field, value) => {
    setManualData(prev => prev.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Auto-calculate total if quantity and price are present
        if (field === 'quantity' || field === 'price') {
          const quantity = field === 'quantity' ? parseFloat(value) || 0 : parseFloat(item.quantity) || 0;
          const price = field === 'price' ? parseFloat(value) || 0 : parseFloat(item.price) || 0;
          updatedItem.total = (quantity * price).toFixed(2);
        }
        
        return updatedItem;
      }
      return item;
    }));
  };
  
  const addRow = () => {
    setManualData(prev => [...prev, { 
      id: Date.now(), 
      date: '', 
      product: '', 
      quantity: '', 
      price: '', 
      total: '' 
    }]);
  };
  
  const removeRow = (id) => {
    if (manualData.length === 1) {
      return; // Don't remove the last row
    }
    setManualData(prev => prev.filter(item => item.id !== id));
  };
  
  const handleManualSubmit = (e) => {
    e.preventDefault();
    
    // Validate data
    const hasEmptyFields = manualData.some(item => 
      !item.date || !item.product || !item.quantity || !item.price
    );
    
    if (hasEmptyFields) {
      toast({
        title: 'Validation error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }
    
    // Format data for submission
    const formattedData = manualData.map(item => ({
      date: item.date,
      product: item.product,
      quantity: parseFloat(item.quantity),
      price: parseFloat(item.price),
      total: parseFloat(item.total),
      category: 'Manual Entry'
    }));
    
    saveManualDataMutation.mutate(formattedData);
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-neutral-100">
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav title="Upload Financial Data" onMenuClick={handleMenuClick} />
        
        <main className="flex-1 overflow-y-auto bg-neutral-100 p-6">
          <div className="grid grid-cols-1 gap-6">
            {/* File Upload Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                File Upload
              </h2>
              <p className="text-gray-600 mb-6">
                Upload your financial data in CSV, Excel, or JSON format.
              </p>
              
              <FileUpload onSuccess={handleFileUploadSuccess} />
            </div>
            
            {/* Manual Data Entry Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Manual Data Entry
              </h2>
              <p className="text-gray-600 mb-6">
                Enter your financial data manually using the form below.
              </p>
              
              <form onSubmit={handleManualSubmit}>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-2 px-4 text-left">Date</th>
                        <th className="py-2 px-4 text-left">Product</th>
                        <th className="py-2 px-4 text-left">Quantity</th>
                        <th className="py-2 px-4 text-left">Price ($)</th>
                        <th className="py-2 px-4 text-left">Total ($)</th>
                        <th className="py-2 px-4 text-left w-10"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {manualData.map((item, index) => (
                        <tr key={item.id} className="border-t">
                          <td className="py-2 px-4">
                            <input
                              type="date"
                              value={item.date}
                              onChange={(e) => handleInputChange(item.id, 'date', e.target.value)}
                              className="w-full p-1.5 border rounded"
                              required
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="text"
                              value={item.product}
                              onChange={(e) => handleInputChange(item.id, 'product', e.target.value)}
                              className="w-full p-1.5 border rounded"
                              placeholder="Product name"
                              required
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleInputChange(item.id, 'quantity', e.target.value)}
                              className="w-full p-1.5 border rounded"
                              placeholder="0"
                              min="0"
                              step="1"
                              required
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="number"
                              value={item.price}
                              onChange={(e) => handleInputChange(item.id, 'price', e.target.value)}
                              className="w-full p-1.5 border rounded"
                              placeholder="0.00"
                              min="0"
                              step="0.01"
                              required
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              type="number"
                              value={item.total}
                              className="w-full p-1.5 border rounded bg-gray-50"
                              readOnly
                            />
                          </td>
                          <td className="py-2 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => removeRow(item.id)}
                              className="text-red-500 hover:text-red-700"
                              title="Remove row"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={addRow}
                    className="flex items-center text-[#1a1a2e] px-3 py-1 border border-current rounded"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Row
                  </button>
                  
                  <button
                    type="submit"
                    className="bg-[#1a1a2e] text-white px-4 py-2 rounded"
                    disabled={saveManualDataMutation.isLoading}
                  >
                    {saveManualDataMutation.isLoading ? 'Saving...' : 'Save Data'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}