import React from "react";
import { render } from "react-dom";

import { Provider } from "./context";

import RunProgress from "./run/progress";

const runs = document.querySelectorAll("[data-runly-run]");

runs.forEach(el => {
	const org = el.dataset.runlyOrg;
	const runId = el.dataset.runlyRun;
	const token = el.dataset.runlyToken;

	render(
		<Provider accessToken={token}>
			<RunProgress {...{ org, runId }} />
		</Provider>,
		el
	);
});
