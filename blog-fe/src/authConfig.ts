export const msalConfig = {
  auth: {
    clientId: "7ff57226-a44b-458e-a04e-22518077abc3",
    authority:
      "https://login.microsoftonline.com/5bbc8cf7-f071-4857-bc9d-7b2c9bbd3e9e", // This is a URL (e.g. https://login.microsoftonline.com/5bbc8cf7-f071-4857-bc9d-7b2c9bbd3e9e)
    redirectUri: "http://localhost:3000",
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
