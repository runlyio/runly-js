import { useState, useEffect, useCallback } from "react";

import { useConfig } from "./config";
import useChannel from "./channel";

import { merge } from "lodash";

const useRunConnection = (org, runId) => {
	const [run, setRun] = useState();
	const { url, token } = useConfig();

	const channel = useChannel(`${url}/${org}/runs/${runId}/channel`, token);

	const onRunStatus = useCallback(newRun => {
		setRun(existingRun => merge({}, existingRun, newRun));
	}, []);

	useEffect(() => {
		if (channel.connection) {
			channel.connection.on("RunStatus", onRunStatus);
		}

		return () => {
			if (channel.connection) {
				channel.connection.off("RunStatus", onRunStatus);
			}
		};
	}, [channel.connection, onRunStatus]);

	return { run, ...channel };
};

export default useRunConnection;
