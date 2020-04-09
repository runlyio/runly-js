import { useLazyFetch } from "react-fetch-hooks";

import { useConfig } from "../config";

export const useRequeueRun = (org, runId) => {
	const { url, token } = useConfig();

	return useLazyFetch(
		url && token && org && runId ? `${url}/${org}/runs/${runId}` : null,
		{
			method: "POST",
			token
		}
	);
};
