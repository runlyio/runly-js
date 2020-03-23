import { useState, useEffect } from "react";
import useChannel from "./channel";

const useRunConnection = ({ org, runId }) => {
	const [run, setRun] = useState();

	const { connection, ...connectionState } = useChannel(
		`${process.env.API_URL}/${org}/runs/${runId}/channel`
	);

	useEffect(() => {
		if (connection) {
			connection.on("RunStatus", run => setRun(run));
		}
	}, [connection]);

	return { run, ...connectionState };
};

export default useRunConnection;
