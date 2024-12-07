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
<<<<<<< HEAD
  return localStorage.getItem('token');
}
=======
  return localStorage.getItem('accessToken');
};
>>>>>>> 20368886c02c76c9c6a4fc04affcf7fc5788f61d
