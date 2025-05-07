import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';

export function MainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav onMenuClick={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 