import React from "react";
import { navigate } from "gatsby";

import { AuthProvider, RunlyProvider } from "@runly/core";

const Wrapper = ({ element }) => (
	<AuthProvider clientId="wiqAwis2QTq0R2ewggis6cnUntp6JGm1" navigate={navigate}>
		{accessToken => (
			<RunlyProvider accessToken={accessToken}>{element}</RunlyProvider>
		)}
	</AuthProvider>
);

export default Wrapper;
