const matchedEls = document.querySelectorAll("[data-runly-component]");

let rootEl;

if (matchedEls.length) {
	if (!rootEl) {
		rootEl = document.createElement("div");
		rootEl.setAttribute("id", "runly-root");
		document.body.appendChild(rootEl);
	}
	initRunlyComponents();
}

async function initRunlyComponents() {
	let componentsToRender = [];
	let runlyToken;
	const RunlyComponents = await import("@runly/react-bootstrap");
	const React = await import("react");
	const ReactDOM = await import("react-dom");

	const { RunlyProvider } = RunlyComponents;

	matchedEls.forEach(el => {
		const {
			runlyComponent,
			runlyToken: _runlyToken,
			...runlyProps
		} = el.dataset;
		if (!runlyToken) {
			runlyToken = _runlyToken;
		}

		const ComponentToRender = RunlyComponents[runlyComponent];

		if (!ComponentToRender) {
			throw new Error(
				`Unrecognized runly component name: ${runlyComponent}. Check your data-runly-component attribute.`
			);
		}

		if (!runlyToken) {
			throw new Error(
				`Missing required data attribute runly-token for ${runlyComponent} component. Make sure to include data-runly-token on your HTML elements.`
			);
		}

		const props = convertRunlyProps(runlyProps);

		componentsToRender.push({ component: ComponentToRender, el, ...props });
	});

	ReactDOM.render(
		<RunlyProvider accessToken={runlyToken}>
			<>
				{componentsToRender.map(({ component: Component, el, ...props }) =>
					ReactDOM.createPortal(<Component {...props} />, el)
				)}
			</>
		</RunlyProvider>,
		rootEl
	);
}

function convertRunlyProps(runlyProps) {
	const props = {};

	for (let propName in runlyProps) {
		if (propName.startsWith("runly")) {
			props[convertAttrName(propName)] = runlyProps[propName];
		}
	}

	return props;
}

function convertAttrName(name) {
	let propName = name.substring(5, name.length);
	propName = propName.charAt(0).toLowerCase() + propName.substring(1);
	return propName;
}
