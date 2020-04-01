import React, { useState, useCallback } from "react";
import { OrgChooser } from "@runly/react-bootstrap";

const RunForm = ({ onSubmit }) => {
	const [org, setOrg] = useState("");
	const onOrgChange = useCallback(o => setOrg(o), []);

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
				<label htmlFor="org">Organization</label>
				<OrgChooser id="org" onChange={onOrgChange} />
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
