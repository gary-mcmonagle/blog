import { useIsAuthenticated } from "@azure/msal-react";
import { useEffect } from "react";
import { getWeatherForecast } from "../api/getWeatherForecast";
import { SignInButton } from "../components/SignInButton";
import React, { useState } from "react";
import { PageLayout } from "../components/PageLayout";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import Button from "react-bootstrap/Button";


function ProfileContent() {
    const { instance, accounts, inProgress } = useMsal();
    const [accessToken, setAccessToken] = useState<any>(null);

    const name = accounts[0] && accounts[0].name;

    function RequestAccessToken() {
        getWeatherForecast(accessToken).then((d) => console.log(d));
        const request = {
            ...loginRequest,
            scopes: ["api://59eec992-c071-492a-8fcd-9639077e3b39/user_impersonation"],
            account: accounts[0]
        };

        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance.acquireTokenSilent(request).then((response) => {
            setAccessToken(response.accessToken);
        }).catch((e) => {
            instance.acquireTokenPopup(request).then((response) => {
                setAccessToken(response.accessToken);
            });
        });
    }

    const makeApiRequest = async (accessToken: string) => {
        getWeatherForecast(accessToken)
    }

    return (
        <>
            <h5 className="card-title">Welcome {name}</h5>
            {accessToken ? 
                <p>Access Token Acquired!</p>
                :
                <Button variant="secondary" onClick={RequestAccessToken}>Request Access Token</Button>
            } 
            {
                accessToken ? <Button variant="secondary" onClick={() => makeApiRequest(accessToken)}>Make Api Request</Button> : 
                <></>
            }
        </>
    );
};


export const AdminPage = () => {
  const isAuthenticated = useIsAuthenticated();
  if (!isAuthenticated) {
    return <SignInButton></SignInButton>;
  }
  return <AuthenticatedAdmin></AuthenticatedAdmin>;
};

const AuthenticatedAdmin = () => {
  return (
    <ProfileContent></ProfileContent>
  );
};
