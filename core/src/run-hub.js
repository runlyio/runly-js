import { useState, useEffect } from "react";

import { useConfig } from "./config";
import useChannel from "./channel";

const useRunConnection = (org, runId) => {
	const [run, setRun] = useState();
	const { url, token } = useConfig();

	const channel = useChannel(`${url}/${org}/runs/${runId}/channel`, token);

	useEffect(() => {
		if (channel.connection) {
			channel.connection.on("RunStatus", run => setRun(run));
		}
	}, [channel.connection]);

	return { run, ...channel };
};

export default useRunConnection;
