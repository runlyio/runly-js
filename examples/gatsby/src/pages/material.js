import React from "react";

import Layout from "../layout";

import { useLogin } from "@runly/ui";
import { RunProgress } from "@runly/material";

const MaterialPage = ({ location }) => {
	const isAuthenticated = useLogin(location);

	if (!isAuthenticated) {
		return <span>Authenticating...</span>;
	}

	const run = { org: "runly", runId: "9e391b9c-fefa-4eda-9693-e32453ba0181" };

	return (
		<Layout>
			<RunProgress {...run} />
		</Layout>
	);
};

export default MaterialPage;
