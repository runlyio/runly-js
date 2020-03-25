import React from "react";
import { render } from "react-dom";

import RunProgress from "./run/progress";

const runs = document.querySelectorAll("[data-runly-run]");

runs.forEach(el => {
	const org = el.dataset.runlyOrg;
	const runId = el.dataset.runlyRun;
	render(<RunProgress {...{ org, runId }} />, el);
});
