import React, { createContext, useContext, useMemo } from "react";

const RunlyConfigContext = createContext();

export const Provider = ({
	accessToken,
	url = "https://api.runly.io",
	children
}) => {
	const value = useMemo(() => ({ accessToken, url }), [accessToken, url]);

	return (
		<RunlyConfigContext.Provider value={value}>
			{children}
		</RunlyConfigContext.Provider>
	);
};

export const useConfig = () => {
	const cfg = useContext(RunlyConfigContext);

	if (!cfg) {
		throw new Error(
			"Missing Runly context. Make sure to include a RunlyProvider component up your component tree with your access token."
		);
	}

	return cfg;
};
