import { useFetch } from "react-fetch-hooks";

import { useConfig } from "../config";

export const useFetchOrgAccounts = () => {
	const { url, token } = useConfig();

	return useFetch(url && token ? `${url}/account/orgs/` : null, {
		method: "GET",
		bearerToken: token
	});
};
