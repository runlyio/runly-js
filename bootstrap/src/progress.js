import React, { useState, useCallback } from "react";
import { useRunConnection, ProgressText } from "@runly/ui";

import RetryButton from "./retry";

const RunProgress = ({ org, runId, allowRetry = false }) => {
	const [retryRunId, setRetryRunId] = useState();
	const onRequeued = useCallback(r => setRetryRunId(r.id), []);

	const { run } = useRunConnection(org, retryRunId || runId);

	if (!run) {
		return <Indeterminant />;
	}

	return (
		<>
			<ProgressBar isRunning={run.state == "Running"} progress={run.progress} />
			<ProgressText
				progress={run.progress}
				component="small"
				className="text-muted"
			/>
			{allowRetry ? (
				<p>
					<RetryButton {...{ org, run, onRequeued }} />
				</p>
			) : null}
		</>
	);
};

const ProgressBar = ({ isRunning, progress }) => {
	if (isProgressEmpty(progress)) {
		return <Indeterminant />;
	}

	const { success, failed, total } = progress;

	if (!total) {
		return (
			<Indeterminant
				className={`${failed ? "bg-danger" : success ? "bg-success" : ""}`}
			/>
		);
	}

	return (
		<div className="progress">
			<Progress isRunning={isRunning} isSuccess value={success} total={total} />
			<Progress isRunning={isRunning} value={failed} total={total} />
		</div>
	);
};

const Indeterminant = ({ className }) => (
	<div className="progress">
		<div
			className={`progress-bar progress-bar-striped progress-bar-animated ${
				className || ""
			}`}
			role="progressbar"
			style={{ width: "100%" }}
		></div>
	</div>
);

const Progress = ({ isRunning, isSuccess, value, total }) => {
	if (!value) return null;

	const percentage = (value / total) * 100.0;

	return (
		<div
			className={`progress-bar ${isSuccess ? "bg-success" : "bg-danger"} ${
				isRunning ? "progress-bar-striped progress-bar-animated" : ""
			}`}
			role="progressbar"
			style={{ width: `${percentage}%` }}
			aria-valuenow={value}
			aria-valuemin={value}
			aria-valuemax={total}
		></div>
	);
};

function isProgressEmpty(progress) {
	if (!progress) return true;
	if (!progress.success && !progress.failed && !progress.total) return true;
	return false;
}

export default RunProgress;
