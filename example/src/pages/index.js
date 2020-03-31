import React, { useState, useCallback } from "react";

import Layout from "../layout";
import RunForm from "../run-form";

import { RunProgress } from "@runly/react";

const ExamplePage = () => {
	const [run, setRun] = useState();
	const onRunSelected = useCallback(run => setRun(run), []);

	return (
		<Layout>
			{!run ? (
				<RunForm onSubmit={onRunSelected} />
			) : (
				<span>
					<RunProgress {...run} />
				</span>
			)}
		</Layout>
	);
};

export default ExamplePage;
