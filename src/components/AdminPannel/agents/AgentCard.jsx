import React from "react";
import { Edit, Trash2, Phone, Mail } from "lucide-react";

export function AgentCard({ agent }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="p-5 flex items-center">
        <img 
          src={agent.avatarUrl} 
          alt={agent.name} 
          className="w-16 h-16 rounded-full object-cover mr-5"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-800">{agent.name}</h3>
          <p className="text-gray-500 text-sm">{agent.role}</p>
          
          <div className="mt-3 flex items-center justify-between text-sm">
            <div className="flex flex-col space-y-1.5">
              <div className="flex items-center text-gray-600">
                <Mail size={14} className="mr-2" />
                <span>{agent.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone size={14} className="mr-2" />
                <span>{agent.phone}</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="bg-red-100 text-blue-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
                {agent.listings} listings
              </span>
            </div>
          </div>
        </div>
        
        <div className="ml-4 flex items-center space-x-2">
          <button className="p-1.5 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors">
            <Edit size={16} />
          </button>
          <button className="p-1.5 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}