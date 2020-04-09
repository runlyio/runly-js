import { useState, useEffect } from "react";

import { useConfig } from "./config";
import useChannel from "./channel";

const useRunConnection = (org, runId) => {
	const [run, setRun] = useState();
	const { url, token } = useConfig();

	const { connection, ...connectionState } = useChannel(
		`${url}/${org}/runs/${runId}/channel`,
		token
	);

	useEffect(() => {
		if (connection) {
			connection.on("RunStatus", run => setRun(run));
		}
	}, [connection]);

	return { run, ...connectionState };
};

export default useRunConnection;
