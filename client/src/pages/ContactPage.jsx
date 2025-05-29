import React, { useState } from 'react';
import { useMutation } from 'react-query';
import api from '../utils/api';
import { Sidebar } from '../components/layout/Sidebar';
import { TopNav } from '../components/layout/TopNav';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '../hooks/useToast';

export default function ContactPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const { toast } = useToast();
  
  const contactMutation = useMutation(
    async (data) => {
      const response = await api.post('/contact', data);
      return response.data;
    },
    {
      onSuccess: () => {
        toast({
          title: 'Message sent',
          description: 'Thank you for your message. We will respond shortly.',
          variant: 'success',
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      },
      onError: (error) => {
        toast({
          title: 'Failed to send message',
          description: error.response?.data?.message || error.message,
          variant: 'destructive',
        });
      }
    }
  );
  
  const handleMenuClick = () => {
    setIsMobileOpen(true);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-neutral-100">
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav title="Contact Us" onMenuClick={handleMenuClick} />
        
        <main className="flex-1 overflow-y-auto bg-neutral-100 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="grid md:grid-cols-3">
                {/* Contact Info Section */}
                <div className="bg-[#1a1a2e] text-white p-8">
                  <h2 className="text-2xl font-bold mb-6">Get in touch</h2>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <Mail className="w-5 h-5 mr-3 mt-1" />
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <p className="mt-1">support@insightedge.com</p>
                        <p className="mt-1">info@insightedge.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="w-5 h-5 mr-3 mt-1" />
                      <div>
                        <h3 className="font-semibold">Phone</h3>
                        <p className="mt-1">+1 (555) 123-4567</p>
                        <p className="mt-1">+1 (555) 987-6543</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 mr-3 mt-1" />
                      <div>
                        <h3 className="font-semibold">Office</h3>
                        <p className="mt-1">
                          123 Business Avenue<br />
                          Suite 456<br />
                          San Francisco, CA 94107
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-12">
                    <h3 className="font-semibold mb-4">Business hours</h3>
                    <p className="text-sm">
                      Monday - Friday: 9:00 AM - 5:00 PM<br />
                      Saturday: Closed<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
                
                {/* Contact Form Section */}
                <div className="col-span-2 p-8">
                  <h2 className="text-2xl font-bold mb-2">Send us a message</h2>
                  <p className="text-gray-600 mb-6">
                    Have questions about InsightEdge? Want to request a feature?
                    Send us a message and we'll get back to you as soon as possible.
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block mb-1 font-medium">Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block mb-1 font-medium">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block mb-1 font-medium">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#1a1a2e] focus:border-transparent resize-none"
                        required
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-[#1a1a2e] text-white px-6 py-2 rounded-md flex items-center"
                        disabled={contactMutation.isLoading}
                      >
                        {contactMutation.isLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}