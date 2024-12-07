export const saveUserSession = (sessionData) => {
  localStorage.setItem('token', sessionData.token);
  localStorage.setItem('userId', sessionData.userId);
};

export const clearUserSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getUserId = () => {
  return localStorage.getItem('userId');
};

export const getAccessToken = () => {
  return localStorage.getItem('token');
}