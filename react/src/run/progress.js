import React from "react";
import useRunConnection from "./hub";

const RunProgress = ({ org, runId }) => {
	const { run } = useRunConnection(org, runId);

	return <pre>{JSON.stringify(run, null, 2)}</pre>;
};

export default RunProgress;
