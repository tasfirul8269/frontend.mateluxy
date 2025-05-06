import React, { useState } from "react";
import { Edit, Trash2, Phone, Mail } from "lucide-react";
import { toast } from "sonner";
import { AgentFormDialog } from "./AgentFormDialog";

export function AgentCard({ agent, onAgentUpdated, onAgentDeleted }) {
  const [imgError, setImgError] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const defaultImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(agent.fullName)}&background=random`;

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this agent?')) {
      return;
    }

    try {
      setIsDeleting(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/agents/${agent.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete agent');
      }

      toast.success('Agent deleted successfully');
      if (onAgentDeleted) {
        onAgentDeleted(agent.id);
      }
    } catch (error) {
      console.error('Error deleting agent:', error);
      toast.error('Failed to delete agent');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
        <div className="p-5 flex items-center">
          <img 
            src={imgError ? defaultImage : (agent.profileImage || defaultImage)}
            alt={agent.fullName} 
            className="w-16 h-16 rounded-full object-cover mr-5"
            onError={() => setImgError(true)}
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-800">{agent.fullName}</h3>
            <p className="text-gray-500 text-sm">{agent.position}</p>
            
            <div className="mt-3 flex items-center justify-between text-sm">
              <div className="flex flex-col space-y-1.5">
                <div className="flex items-center text-gray-600">
                  <Mail size={14} className="mr-2" />
                  <span>{agent.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone size={14} className="mr-2" />
                  <span>{agent.contactNumber}</span>
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
            <button 
              className="p-1.5 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
              onClick={handleEdit}
              disabled={isDeleting}
            >
              <Edit size={16} />
            </button>
            <button 
              className="p-1.5 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

      <AgentFormDialog 
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        agent={agent}
        onAgentUpdated={onAgentUpdated}
        isEditing={true}
      />
    </>
  );
}