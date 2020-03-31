import React from "react";
import { render } from "react-dom";

import { RunlyProvider, RunProgress } from "@runly/react";

const runs = document.querySelectorAll("[data-runly-run]");

runs.forEach(el => {
	const org = el.dataset.runlyOrg;
	const runId = el.dataset.runlyRun;
	const token = el.dataset.runlyToken;

	render(
		<RunlyProvider accessToken={token}>
			<RunProgress {...{ org, runId }} />
		</RunlyProvider>,
		el
	);
});
