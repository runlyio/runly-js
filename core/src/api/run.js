import { useLazyFetch } from "react-fetch-hooks";

import { useCurrentAccessToken, useApiUrl } from "../config";

export const useRequeueRun = (org, runId) => {
	const url = useApiUrl();
	const bearerToken = useCurrentAccessToken();

	return useLazyFetch(
		url && bearerToken && org && runId ? `${url}/${org}/runs/${runId}` : null,
		{
			method: "POST",
			bearerToken
		}
	);
};
