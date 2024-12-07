export const LINKEDIN_CONFIG = {
  clientId: import.meta.env.VITE_LINKEDIN_CLIENT_ID,
  clientSecret: import.meta.env.VITE_LINKEDIN_CLIENT_SECRET,
  redirectUri: import.meta.env.VITE_LINKEDIN_REDIRECT_URI,
  scope: ['profile', 'emailaddress'].join(' '),
};