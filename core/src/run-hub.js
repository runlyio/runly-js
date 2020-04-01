import { useState, useEffect } from "react";

import { useApiUrl, useCurrentAccessToken } from "./config";
import useChannel from "./channel";

const useRunConnection = (org, runId) => {
	const [run, setRun] = useState();
	const url = useApiUrl();
	const accessToken = useCurrentAccessToken();

	const { connection, ...connectionState } = useChannel(
		`${url}/${org}/runs/${runId}/channel`,
		accessToken
	);

	useEffect(() => {
		if (connection) {
			connection.on("RunStatus", run => setRun(run));
		}
	}, [connection]);

	return { run, ...connectionState };
};

export default useRunConnection;
