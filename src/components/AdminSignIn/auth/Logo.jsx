import React from 'react';
import { ShieldCheck } from 'lucide-react';

const Logo = ({ size = 36, className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="text-blue-600 p-2 rounded-xl bg-blue-50">
        <ShieldCheck size={size} strokeWidth={1.5} />
      </div>
      <span className="ml-2 text-xl font-semibold text-gray-800">SecureSign</span>
    </div>
  );
};

export default Logo;