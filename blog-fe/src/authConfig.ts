export const msalConfig = {
  auth: {
    // clientId: "ee0228cf-f199-4c6e-8234-cf642b3849f7",
    clientId: process.env.REACT_APP_AUTH_CLIENT_ID || "",
    authority:
      //"https://login.microsoftonline.com/5bbc8cf7-f071-4857-bc9d-7b2c9bbd3e9e", // This is a URL (e.g. https://login.microsoftonline.com/5bbc8cf7-f071-4857-bc9d-7b2c9bbd3e9e)
      process.env.REACT_APP_AUTH_AUTHORITY || "", // This is a URL (e.g. https://login.microsoftonline.com/5bbc8cf7-f071-4857-bc9d-7b2c9bbd3e9e)

    // redirectUri: "http://localhost:3000",
    redirectUri: process.env.REACT_APP_AUTH_REDIRECT_URI || "",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ["User.Read"],
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
