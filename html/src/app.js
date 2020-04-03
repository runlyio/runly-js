import React from "react";
import { render } from "react-dom";

import { RunlyProvider, RunProgress } from "@runly/react-bootstrap";

const components = {
	RunProgress
};

const componentsToRender = document.querySelectorAll("[data-runly-component]");

componentsToRender.forEach(el => {
	const { runlyComponent, runlyToken, ...runlyProps } = el.dataset;

	const ComponentToRender = components[runlyComponent];

	if (!ComponentToRender) {
		throw new Error(
			`Unrecognized runly component name: ${runlyComponent}. Check your data-runly-component attribute.`
		);
	}

	if (!runlyToken) {
		throw new Error(
			`Missing required data attribute runly-token for ${runlyComponent} component. Make sure to include data-runly-token on your HTML elements.`
		);
	}

	const props = convertRunlyProps(runlyProps);
	console.log({ runlyProps, props });

	render(
		<RunlyProvider accessToken={runlyToken}>
			<ComponentToRender {...props} />
		</RunlyProvider>,
		el
	);
});

function convertRunlyProps(runlyProps) {
	const props = {};

	for (let propName in runlyProps) {
		if (propName.startsWith("runly")) {
			props[propName.substring(5, propName.length)] = runlyProps[propName];
		}
	}

	return props;
}
