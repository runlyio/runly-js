import React, { useState, useCallback } from "react";

const RunForm = ({ onSubmit }) => {
	const [org, setOrg] = useState("");
	const onOrgChange = useCallback(ev => setOrg(ev.target.value), []);

	const [runId, setRunId] = useState("");
	const onRunChange = useCallback(ev => setRunId(ev.target.value), []);

	const handleSubmit = useCallback(
		ev => {
			ev.preventDefault();
			if (onSubmit) {
				onSubmit({ org, runId });
			}
		},
		[onSubmit, runId, org]
	);

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<label htmlFor="org">Organization ID</label>
				<input
					type="text"
					className="form-control"
					id="org"
					value={org}
					onChange={onOrgChange}
					required
				/>
			</div>

			<div className="form-group">
				<label htmlFor="run">Run ID</label>
				<input
					type="text"
					className="form-control"
					id="run"
					value={runId}
					onChange={onRunChange}
					required
				/>
			</div>

			<button type="submit" className="btn btn-primary btn-lg">
				Do it
			</button>
		</form>
	);
};

export default RunForm;
