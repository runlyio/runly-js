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
				style={{ width: "15%" }}
				aria-valuenow="15"
				aria-valuemin="0"
				aria-valuemax="100"
			>
				15%
			</div>
			<div
				className="progress-bar bg-success progress-bar-striped progress-bar-animated"
				role="progressbar"
				style={{ width: "30%" }}
				aria-valuenow="30"
				aria-valuemin="0"
				aria-valuemax="100"
			>
				30%
			</div>
			<div
				className="progress-bar bg-info progress-bar-striped progress-bar-animated"
				role="progressbar"
				style={{ width: "20%" }}
				aria-valuenow="20"
				aria-valuemin="0"
				aria-valuemax="100"
			>
				20%
			</div>
		</div>
	);
};

export default RunProgress;
