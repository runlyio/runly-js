const runs = document.querySelectorAll("[data-runly-run]");

if (runs.length) {
	initRunlyComponents();
}

async function initRunlyComponents() {
	const React = await import("react");
	const Provider = await import("./context-provider");
	const RunProgress = await import("./run/progress");
	const ReactDOM = await import("react-dom");

	runs.forEach(el => {
		const org = el.dataset.runlyOrg;
		const runId = el.dataset.runlyRun;
		const token = el.dataset.runlyToken;

		ReactDOM.render(
			<Provider accessToken={token}>
				<RunProgress {...{ org, runId }} />
			</Provider>,
			el
		);
	});
}
