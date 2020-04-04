import React from "react";

const Layout = ({ children }) => (
	<main role="main" className="container" style={{ marginTop: "5em" }}>
		{children}
	</main>
);

export default Layout;
