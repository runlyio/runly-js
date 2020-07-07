import React from "react";

import { formatNumber } from "accounting";

const ProgressText = ({ progress, component, ...props }) => {
	if (!progress) return null;

	const { success, failed, total } = progress;

	const Component = component || "span";

	let text = "";

	if (success && success === total) {
		return (
			<Component {...props}>{formatNumber(success)} successful item{success === 1 ? "" : "s"}</Component>
		);
	}

	if (failed && failed === total) {
		return (
			<Component {...props}>{formatNumber(failed)} failed item{failed === 1 ? "" : "s"}</Component>
		);
	}

	if (success) {
		text += `${formatNumber(success)} successful`;
	}

	if (failed) {
		if (text) {
			text += `, ${formatNumber(failed)} failed`;
		} else {
			text += `${formatNumber(failed)} failed`;
		}
	}

	if (total) {
		if (text) {
			text += ` out of ${formatNumber(total)}`;
		} else {
			text += `${formatNumber(total)} unprocessed`;
		}
	}

	if (!text) return null;

	return <Component {...props}>{text}</Component>;
};

export default ProgressText;
