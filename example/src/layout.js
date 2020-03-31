import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import { RunlyProvider } from "@runly/react";

const Layout = ({ children }) => {
	const {
		site: {
			siteMetadata: { accessToken }
		}
	} = useStaticQuery(graphql`
		query Wrapper {
			site {
				siteMetadata {
					accessToken
				}
			}
		}
	`);

	return (
		<main role="main" className="container" style={{ marginTop: "5em" }}>
			<RunlyProvider accessToken={accessToken}>{children}</RunlyProvider>
		</main>
	);
};

export default Layout;
