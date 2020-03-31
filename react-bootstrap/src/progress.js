import React from "react";
import { useRunConnection } from "@runly/core";

const RunProgress = ({ org, runId }) => {
	const { run } = useRunConnection(org, runId);

	console.log(run);

	return (
		<div className="progress">
			<div
				className="progress-bar progress-bar-striped progress-bar-animated"
				role="progressbar"
				aria-valuenow="75"
				aria-valuemin="0"
				aria-valuemax="100"
				style={{ width: "75%" }}
			></div>
		</div>
	);
};

export default RunProgress;
