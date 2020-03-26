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
	const cfg = useContext(RunlyConfigContext) || {};
	return cfg;
};
