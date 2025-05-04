import React from "react";
import { Edit, Trash2, ShieldCheck } from "lucide-react";

export function AdminCard({ admin }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="p-5 flex items-center">
        <div className="relative">
          <img 
            src={admin.avatarUrl} 
            alt={admin.name} 
            className="w-14 h-14 rounded-full object-cover"
          />
          <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full">
            <ShieldCheck className="w-5 h-5 text-red-600" />
          </div>
        </div>
        
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">{admin.name}</h3>
            <div className="flex items-center space-x-2">
              <button className="p-1.5 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors">
                <Edit size={16} />
              </button>
              <button className="p-1.5 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          
          <p className="text-gray-500 text-sm mt-1">{admin.email}</p>
          
          <div className="flex items-center justify-between mt-2 text-sm">
            <span className="bg-gray-100 text-gray-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
              {admin.role}
            </span>
            <span className="text-xs text-gray-500">
              Last active: {admin.lastActive}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}