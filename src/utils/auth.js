// Get the token from localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Save the token to localStorage
export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

// Remove the token from localStorage
export const removeToken = () => {
  localStorage.removeItem('token');
};

// Check if the user is authenticated
export const isAuthenticated = () => {
  const token = getToken();
  return !!token; // Returns true if token exists, false otherwise
};
