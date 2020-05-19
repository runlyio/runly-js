import React, { useEffect, useCallback } from "react";

import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	CircularProgress
} from "@material-ui/core";

import { useFetchOrgAccounts } from "@runly/ui";

const OrgChooser = ({ onChange, value, ...props }) => {
	const { isFetched, body: orgs } = useFetchOrgAccounts();

	useEffect(() => {
		if (orgs && onChange) {
			onChange(orgs[0].id);
		}
	}, [orgs, onChange]);

	const handleChange = useCallback(
		ev => {
			if (onChange) {
				onChange(ev.target.value);
			}
		},
		[onChange]
	);

	if (!isFetched) {
		return <CircularProgress />;
	}

	return (
		<FormControl>
			<InputLabel id="orgChooser-label">Organization</InputLabel>
			<Select
				labelId="orgChooser-label"
				id="orgChooser"
				value={value}
				onChange={handleChange}
				{...props}
			>
				{orgs.map(({ id, name }) => (
					<MenuItem key={id} value={id}>
						{name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default OrgChooser;
