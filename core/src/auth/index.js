// https://auth0.com/docs/libraries/auth0-spa-js
// https://auth0.com/docs/quickstart/spa/react/01-login
// https://auth0.com/docs/quickstart/spa/react/02-calling-an-api

import { useEffect, useCallback } from "react";

import { useAuth, Provider } from "./context";

export const useIsAuthenticated = () => {
	const { isAuthenticated } = useAuth();
	return isAuthenticated;
};

export const useLogin = (location, path = "") => {
	const { client, isAuthenticated } = useAuth();
	const isInitialized = !!client;

	useEffect(() => {
		if (isInitialized && !isAuthenticated) {
			client.loginWithRedirect({
				redirect_uri: `${location?.origin}${path}`,
				appState: location?.href
			});
		}
	}, [client, isAuthenticated, isInitialized, location, path]);

	return isAuthenticated;
};

export const useLogout = () => {
	const { client } = useAuth();
	return useCallback(async (...p) => client?.logout(...p), [client]);
};

export { Provider as AuthProvider };
