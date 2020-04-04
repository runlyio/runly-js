import React, { useEffect, createContext, useContext } from "react";
export { default as RunProgress } from "./progress";
export { default as OrgChooser } from "./org-chooser";
import { RunlyProvider } from "@runly/core";

const RunlyReactBootstrapContext = createContext();

let hasbs4 = undefined;

const bs4test = () => {
	let result = null;

	if (document) {
		const el = document.createElement("div");

		el.setAttribute("style", "display: block;");
		el.setAttribute("class", "d-inline");

		document.body.appendChild(el);
		result = (getComputedStyle(el) === "inline");
		document.body.removeChild(el);
	}

	return result;
}

const RunlyReactBootstrapProvider = ({props,...children}) => {
	useEffect(() => {
		if (typeof hasbs4 === "undefined") {
			hasbs4 = bs4test();
		}
	}, []);

	return (
		<RunlyProvider {...props}>
			{runlyProps => (
				<RunlyReactBootstrapContext.Provider
					{...props}
					{...runlyProps}
					hasbs4={hasbs4}
				>
					{children}
				</RunlyReactBootstrapContext.Provider>
			)}
		</RunlyProvider>
	);
}

const useBsConfig = () => {
	const cfg = useContext(RunlyReactBootstrapContext);
}

// for convenience
export { RunlyProvider } from "@runly/core";
