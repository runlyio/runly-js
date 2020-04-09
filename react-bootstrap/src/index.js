import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";

import { RunlyProvider } from "@runly/core";

export { default as RunProgress } from "./progress";
export { default as OrgChooser } from "./org-chooser";

const bs4test = () => {
	let result = null;

	if (document) {
		const el = document.createElement("div");

		el.setAttribute("style", "display: block;");
		el.setAttribute("class", "d-inline");

		document.body.appendChild(el);
		result = window.getComputedStyle(el).display === "inline";
		document.body.removeChild(el);
	}

	return result;
};

export const RunlyReactBootstrapProvider = ({ children, ...props }) => {
	return (
		<>
			<BootstrapStyles />
			<RunlyProvider {...props}>{children}</RunlyProvider>
		</>
	);
};

const BootstrapStyles = () => {
	const [hasBs4, setHasBs4] = useState(null);
	useEffect(() => {
		if (hasBs4 === null) {
			setHasBs4(bs4test());
		}
	}, [hasBs4]);

	if (!hasBs4) {
		return (
			<Helmet>
				<link
					rel="stylesheet"
					href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
					integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
					crossOrigin="anonymous"
				/>
			</Helmet>
		);
	}
	return null;
};
