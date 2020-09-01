// https://auth0.com/docs/libraries/auth0-spa-js
// https://auth0.com/docs/quickstart/spa/react/01-login
// https://auth0.com/docs/quickstart/spa/react/02-calling-an-api

import React, {
	useEffect,
	useContext,
	createContext,
	useState,
	useCallback
} from "react";
import createAuth0Client from "@auth0/auth0-spa-js";

import URI from "urijs";

import { DEFAULT_API_URL } from "../config";

import { isFunction } from "lodash";

const AuthContext = createContext();

export const Provider = ({
	apiUrl = DEFAULT_API_URL,
	clientId,
	children,
	navigate
}) => {
	if (!isFunction(children)) {
		throw new Error(
			"Children of AuthProvider must be a render function that takes the access token accessor. See https://www.runly.io/docs/integration/js/"
		);
	}

	const [auth, setAuth] = useState({
		client: null,
		isAuthenticated: false
	});

	useEffect(() => {
		async function initClient() {
			const {
				auth: { authority, audience }
			} = await (await fetch(apiUrl)).json();

			const c = await createAuth0Client({
				domain: URI(authority).hostname(),
				client_id: clientId,
				audience
			});

			const uri = URI();
			if (uri.hasQuery("code") && uri.hasQuery("state")) {
				const { appState } = await c.handleRedirectCallback();
				setAuth({ client: c, isAuthenticated: true });

				if (navigate) navigate(appState || "/");
			} else {
				const isAuthenticated = await c.isAuthenticated();
				setAuth({ client: c, isAuthenticated });
			}
		}

		initClient();
	}, [apiUrl, clientId, navigate]);

	const { client } = auth;
	const getAccessToken = useCallback(() => client?.getTokenSilently(), [
		client
	]);

	return (
		<AuthContext.Provider value={auth}>
			{children(getAccessToken)}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const auth = useContext(AuthContext);

	if (!auth) {
		throw new Error(
			"Missing Runly Auth context. Make sure to include an AuthProvider component up your component tree with your client ID."
		);
	}

	return auth;
};
