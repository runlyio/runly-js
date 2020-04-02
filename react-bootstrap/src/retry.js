import React, { useCallback, useEffect } from "react";

import { useRequeueRun } from "@runly/core";

const RetryRun = ({ org, run, onRequeued }) => {
	const {
		fetch: requeue,
		body: newRun,
		isFetching: isQueueing,
		error
	} = useRequeueRun(org, run.id);

	const handleClick = useCallback(() => requeue(), [requeue]);

	useEffect(() => {
		if (newRun && onRequeued) {
			onRequeued(newRun);
		}
	}, [newRun, onRequeued]);

	if (run.state == "Enqueued" || run.state == "Running") return null;
	if (run.state == "Successful" && run.progress.failed == 0) return null;

	return (
		<>
			<button
				type="button"
				className="btn btn-secondary btn-sm"
				onClick={handleClick}
				disabled={isQueueing}
			>
				{isQueueing ? (
					<span
						className="spinner-border spinner-border-sm"
						role="status"
						aria-hidden="true"
					></span>
				) : null}
				{isQueueing ? "Queueing..." : "Retry"}
			</button>
			<br />
			{error ? <small className="text-danger">{error.message}</small> : null}
		</>
	);
};

export default RetryRun;
