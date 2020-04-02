import { useFetch } from "react-fetch-hooks";

import { useCurrentAccessToken, useApiUrl } from "../config";

export const useFetchOrgAccounts = () => {
	const url = useApiUrl();
	const bearerToken = useCurrentAccessToken();

	return useFetch(url && bearerToken ? `${url}/account/orgs/` : null, {
		method: "GET",
		bearerToken
	});
};
