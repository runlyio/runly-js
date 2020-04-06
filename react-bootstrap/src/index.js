import React, { useEffect, useState, createContext, useContext } from "react";

import { RunlyProvider } from "@runly/core";

export { default as RunProgress } from "./progress";
export { default as OrgChooser } from "./org-chooser";

const RunlyReactBootstrapContext = createContext();

const bs4test = () => {
	let result = null;

	if (document) {
		const el = document.createElement("div");

		el.setAttribute("style", "display: block;");
		el.setAttribute("class", "d-inline");

		document.body.appendChild(el);
		result = getComputedStyle(el) === "inline";
		document.body.removeChild(el);
	}

	return result;
};

export const RunlyReactBootstrapProvider = ({ props, ...children }) => {
	const [hasBs4, setHasBs4] = useState(null);
	useEffect(() => {
		if (hasBs4 === null) {
			setHasBs4(bs4test());
		}
	}, [hasBs4]);

	return (
		<RunlyProvider {...props}>
			<RunlyReactBootstrapContext.Provider
				{...props}
				value={{ hasBs4, setHasBs4 }}
			>
				{children}
			</RunlyReactBootstrapContext.Provider>
		</RunlyProvider>
	);
};

export const useBsConfig = () => {
	const cfg = useContext(RunlyReactBootstrapContext);
	return cfg;
};

// for convenience
