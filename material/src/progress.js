import React from "react";
import { useRunConnection, ProgressText } from "@runly/ui";

import { Typography, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { startCase } from "lodash";

const RunProgress = ({ org, runId, variant = "thick" }) => {
	if (variant != "thick" && variant != "thin") {
		throw new Error("RunProgress variant must be either 'thick' or 'thin'.");
	}

	const { run } = useRunConnection(org, runId);

	const progressClasses = useProgressStyles({ variant });

	if (!run || isProgressEmpty(run.progress) || !run.progress.total) {
		return (
			<LinearProgress
				variant="indeterminate"
				classes={progressClasses}
				title={startCase(run?.state) || "Loading"}
			/>
		);
	}

	const success = (run.progress.success / run.progress.total) * 100.0;
	const failed =
		((run.progress.success + run.progress.failed) / run.progress.total) * 100.0;

	return (
		<>
			<LinearProgress
				variant="buffer"
				value={success}
				valueBuffer={failed}
				classes={progressClasses}
				title={startCase(run.state)}
			/>
			<ProgressText
				progress={run.progress}
				component={Typography}
				variant="caption"
				color="textSecondary"
			/>
		</>
	);
};

const useProgressStyles = makeStyles(theme => ({
	root: {
		height: ({ variant }) => (variant == "thick" ? theme.spacing(2) : undefined)
	},
	bar1Buffer: {
		backgroundColor: theme.palette.success.main
	},
	bar2Buffer: {
		backgroundColor: theme.palette.error.main
	}
}));

function isProgressEmpty(progress) {
	if (!progress) return true;
	if (!progress.success && !progress.failed && !progress.total) return true;
	return false;
}

export default RunProgress;
