import React, {
	createContext,
	useContext,
	useMemo,
	useState,
	useEffect
} from "react";

import { isFunction } from "lodash";

export const DEFAULT_API_URL = "https://api.runly.io";

const RunlyConfigContext = createContext();

export const Provider = ({ accessToken, url = DEFAULT_API_URL, children }) => {
	const value = useMemo(() => ({ accessToken, url }), [accessToken, url]);

	return (
		<RunlyConfigContext.Provider value={value}>
			{children}
		</RunlyConfigContext.Provider>
	);
};

export const useConfig = () => {
	const cfg = useContext(RunlyConfigContext);
	const [token, setToken] = useState();

	if (!cfg) {
		throw new Error(
			"Missing Runly context. Make sure to include a RunlyProvider component up your component tree with your access token."
		);
	}

	const { url, accessToken } = cfg;

	// accessToken could be a promise or a function
	useEffect(() => {
		let token = accessToken;

		if (token) {
			if (isFunction(token)) {
				token = token();
			}

			if (token) {
				Promise.resolve(token).then(t => setToken(t));
			}
		}
	}, [accessToken]);

	return { url, token };
};
