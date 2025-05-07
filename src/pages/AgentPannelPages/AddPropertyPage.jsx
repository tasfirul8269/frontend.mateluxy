import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PropertyCategorySelector } from '@/components/AgentPannel/PropertyCategorySelector';
import { RegularPropertyForm } from '@/components/AgentPannel/RegularPropertyForm';
import { OffPlanPropertyForm } from '@/components/AgentPannel/OffPlanPropertyForm';

const AddPropertyPage = () => {
  const navigate = useNavigate();
  const [agentData, setAgentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/agents/auth-status`, {
          credentials: 'include',
        });
        
        if (res.ok) {
          const data = await res.json();
          setAgentData(data);
        } else {
          navigate('/agent-login');
        }
      } catch (error) {
        console.error('Error fetching agent data:', error);
        navigate('/agent-login');
      }
    };
    
    fetchAgentData();
  }, [navigate]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleCancelForm = () => {
    // Go back to category selection
    setSelectedCategory(null);
  };

  const handleSubmitProperty = async (propertyData) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("Submitting property data:", propertyData);
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(propertyData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server error: ${response.status} ${response.statusText}`);
      }
      
      const savedProperty = await response.json();
      console.log("Property added successfully:", savedProperty);
      
      navigate('/agent-pannel/properties');
    } catch (error) {
      console.error('Error adding property:', error);
      setError(error.message || 'An error occurred while adding the property');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Render the appropriate form based on the selected category
  const renderForm = () => {
    if (!selectedCategory) {
      return <PropertyCategorySelector onSelectCategory={handleSelectCategory} />;
    }
    
    if (selectedCategory === 'Off Plan') {
      return (
        <OffPlanPropertyForm
          agentData={agentData}
          onSubmit={handleSubmitProperty}
          onCancel={handleCancelForm}
        />
      );
    }
    
    return (
      <RegularPropertyForm
        category={selectedCategory}
        agentData={agentData}
        onSubmit={handleSubmitProperty}
        onCancel={handleCancelForm}
      />
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/agent-pannel/properties')}
            className="p-2 mr-2 rounded-md text-gray-500 hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            {selectedCategory 
              ? `Add New ${selectedCategory} Property` 
              : 'Add New Property'
            }
          </h1>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 p-4 rounded-md border border-red-200">
          <p className="text-red-600">{error}</p>
        </div>
      )}
      
      {renderForm()}
    </div>
  );
};

export default AddPropertyPage; 