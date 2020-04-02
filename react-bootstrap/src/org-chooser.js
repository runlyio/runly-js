import React, { useEffect, useCallback } from "react";

import { useFetchOrgAccounts } from "@runly/core";

const OrgChooser = ({ onChange, ...props }) => {
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
		return (
			<input
				type="text"
				className="form-control"
				disabled
				placeholder="Loading organizations..."
			/>
		);
	}

	return (
		<select className="form-control" onChange={handleChange} {...props}>
			{orgs.map(({ id, name }) => (
				<option key={id} value={id}>
					{name}
				</option>
			))}
		</select>
	);
};

export default OrgChooser;
