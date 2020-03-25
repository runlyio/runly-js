import React from "react";
import useRunConnection from "./hub";

const RunProgress = ({ org, runId }) => {
	const { run } = useRunConnection(org, runId);

	return <textarea>{JSON.stringify(run)}</textarea>;
};

export default RunProgress;
