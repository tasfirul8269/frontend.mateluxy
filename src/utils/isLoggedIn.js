// frontend/src/utils/isLoggedIn.js
export const isLoggedIn = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/check-auth`, {
        method: 'GET',
        credentials: 'include', // Very important to send cookies
      });
  
      const data = await res.json();
      return data.success;
    } catch (err) {
      return false;
    }
  };
  