export const saveUserSession = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData));
  localStorage.setItem('accessToken', userData.accessToken);
};

export const clearUserSession = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('accessToken');
};

export const getUserSession = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const getAccessToken = () => {
  return localStorage.getItem('linkedinAccessToken');
};