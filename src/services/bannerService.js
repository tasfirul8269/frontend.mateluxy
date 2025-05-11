import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Get all banners
export const getAllBanners = async () => {
  try {
    const response = await axios.get(`${API_URL}/banners`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error fetching banners:', error);
    throw error;
  }
};

// Get banners by type (home or offplan)
export const getBannersByType = async (type) => {
  try {
    const response = await axios.get(`${API_URL}/banners?type=${type}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${type} banners:`, error);
    throw error;
  }
};

// Get a single banner
export const getBanner = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/banners/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error fetching banner:', error);
    throw error;
  }
};

// Create a new banner
export const createBanner = async (bannerData) => {
  try {
    const response = await axios.post(`${API_URL}/banners`, bannerData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error creating banner:', error);
    throw error;
  }
};

// Update a banner
export const updateBanner = async (id, bannerData) => {
  try {
    const response = await axios.put(`${API_URL}/banners/${id}`, bannerData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error updating banner:', error);
    throw error;
  }
};

// Delete a banner
export const deleteBanner = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/banners/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error deleting banner:', error);
    throw error;
  }
};
