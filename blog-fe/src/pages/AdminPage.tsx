import { useIsAuthenticated } from "@azure/msal-react";
import { useEffect } from "react";
import { getWeatherForecast } from "../api/getWeatherForecast";
import { SignInButton } from "../components/SignInButton";

export const AdminPage = () => {
    const isAuthenticated = useIsAuthenticated();
    if(!isAuthenticated) {
        return <SignInButton></SignInButton>
    }
    return (
        <AuthenticatedAdmin></AuthenticatedAdmin>
    )
}

const AuthenticatedAdmin = () => {
    useEffect(() => {
        getWeatherForecast().then(d => console.log(d))
    })
    return (<p>Logged In Admin</p>)
}