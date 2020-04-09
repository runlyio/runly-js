import React, { useState, useCallback } from "react";
import { useRunConnection, ProgressText } from "@runly/core";

import { startCase } from "lodash";

import LoadingIndicator from "./loading";
import RetryButton from "./retry";

const RunProgress = ({ org, runId, allowRetry = true }) => {
	const [retryRunId, setRetryRunId] = useState();
	const onRequeued = useCallback(r => setRetryRunId(r.id), []);

	const { run } = useRunConnection(org, retryRunId || runId);

	if (!run) {
		return <LoadingIndicator />;
	}

	if (isProgressEmpty(run.progress)) {
		return (
			<h4>
				<span className={`badge badge${typeFromStatus(run.state)}`}>
					{startCase(run.state)}
				</span>
			</h4>
		);
	}

	return (
		<>
			<ProgressBar run={run} />
			{allowRetry ? (
				<p>
					<RetryButton {...{ org, run, onRequeued }} />
				</p>
			) : null}
		</>
	);
};

const ProgressBar = ({ run }) => {
	return (
		<>
			<div className="progress">
				<Progress
					isRunning={run.state == "Running"}
					isSuccess
					value={run.progress.success}
					total={run.progress.total}
				/>
				<Progress
					isRunning={run.state == "Running"}
					value={run.progress.failed}
					total={run.progress.total}
				/>
			</div>
			<ProgressText
				progress={run.progress}
				component="small"
				className="text-muted"
			/>
		</>
	);
};

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

function typeFromStatus(runStatus) {
	switch (runStatus) {
		case "Enqueued":
			return "-secondary";
		case "Running":
			return "-primary";
		case "Successful":
			return "-success";
		case "Failed":
			return "-danger";
		case "Cancelled":
			return "-warning";
		case "TimedOut":
			return "-danger";
		case "Error":
			return "-danger";
		default:
			return "";
	}
}

function isProgressEmpty(progress) {
	if (!progress) return true;
	if (!progress.success && !progress.failed && !progress.total) return true;
	return false;
}

export default RunProgress;
