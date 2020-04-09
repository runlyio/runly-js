import React, { useCallback } from "react";

import useLocalStorage from "../local-storage";

import Layout from "../layout";
import RunForm from "../run-form";

import { useLogin } from "@runly/core";
import { RunProgress } from "@runly/react-bootstrap";

import "bootstrap/dist/css/bootstrap.css";

const ExamplePage = ({ location }) => {
	const [run, setRun] = useLocalStorage("runly-run");
	const onRunSelected = useCallback(run => setRun(run), [setRun]);
	const onReset = useCallback(() => setRun(null), [setRun]);

	const isAuthenticated = useLogin(location);

	if (!isAuthenticated) {
		return <span>Authenticating...</span>;
	}

	return (
		<Layout>
			{!run ? (
				<RunForm onSubmit={onRunSelected} />
			) : (
				<>
					<h1>
						{run.org}/{run.runId}
					</h1>

					<hr />
					<RunProgress {...run} />

					<hr />
					<button type="button" className="btn btn-secondary" onClick={onReset}>
						Reset
					</button>
				</>
			)}
		</Layout>
	);
};

export default ExamplePage;
