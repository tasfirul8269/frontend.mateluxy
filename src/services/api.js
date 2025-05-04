// Simplified API constants with updated domain
const API_URL = `${import.meta.env.VITE_API_URL}/api`;

// Simplified property API with consistent error handling pattern
export const propertyApi = {
  // Get all properties
  getProperties: async () => {
    try {
      const response = await fetch(`${API_URL}/properties`);
      if (!response.ok) throw new Error('Failed to fetch properties');
      return response.json();
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
  },

  // Get single property by ID
  getPropertyById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/properties/${id}`);
      if (!response.ok) throw new Error(`Failed to fetch property with id ${id}`);
      return response.json();
    } catch (error) {
      console.error(`Error fetching property ${id}:`, error);
      throw error;
    }
  },

  // Create new property
  createProperty: async (propertyData) => {
    try {
      console.log('Submitting property data:', propertyData);
      
      const response = await fetch(`${API_URL}/properties/add-property`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(propertyData),
        mode: 'cors', // Explicitly set CORS mode
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to create property: ${response.status} ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error adding property:', error);
      throw error;
    }
  },

  // Update property
  updateProperty: async (id, propertyData) => {
    try {
      const response = await fetch(`${API_URL}/properties/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(propertyData),
        mode: 'cors',
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to update property with id ${id}: ${response.status} ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error(`Error updating property ${id}:`, error);
      throw error;
    }
  },

  // Delete property
  deleteProperty: async (id) => {
    try {
      const response = await fetch(`${API_URL}/properties/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors',
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to delete property with id ${id}: ${response.status} ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error(`Error deleting property ${id}:`, error);
      throw error;
    }
  },
};

// Export the base API_URL for convenience
export const apiUrl = API_URL;